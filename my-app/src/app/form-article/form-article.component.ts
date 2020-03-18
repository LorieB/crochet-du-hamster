import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms'
import { ArticleService } from '../article.service';
import { ToasterService } from '../toaster.service';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-form-article',
  templateUrl: './form-article.component.html',
  styleUrls: ['./form-article.component.css']
})
export class FormArticleComponent implements OnInit {
  articleForm: FormGroup;
  imagesBDD: FormArray;

  formData = new FormData();

  images = new Array<String>();

  matieres = [];
  categories = [];

  constructor(
    public fb: FormBuilder,
    private artService: ArticleService,
    public toaster: ToasterService,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.getMatCat();
    this.articleForm = this.fb.group({
      titre: ['', Validators.required],
      dateCreation: [null, Validators.required],
      texte: ['', Validators.required],

      matiere: [[''], Validators.required],
      categorie: ['', Validators.required],
      porteClef: [false, Validators.required],

      dispo: ['', Validators.required],
      prix: [null],

      image: [null], // Fichiers img à mettre dans un dossier
      imagesBDD: this.fb.array([]),  // Nom et description de l'img à mettre en BDD
    });
  }
/* Récupère les listes de matières et categories pour les mettre dans les <select> du formulaire */
  getMatCat() {
    this.artService.getMatiereEtCategorie().subscribe(response => {
      this.matieres = response[0];
      this.categories = response[1];
    })
  }

  createItem(nom: String): FormGroup {
    return this.fb.group({
      nomImg: nom,
      descriptionImg: ['', Validators.required]
    });
  }

  addItem(nom: String): void {
    this.imagesBDD = this.articleForm.get('imagesBDD') as FormArray;
    this.imagesBDD.push(this.createItem(nom));
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }


  /* Détecte lorsqu'un fichier est ajouté au formulaire,
  vide le form array contenant les noms
  rempli le tableau d'images avec leur url pour afficher des miniatures dans le formulaire
  crée un nouveau group de formulaire contenant le nom de l'image, une miniature et un champ texte pour la description
  */
  detectFiles(event) {
    if (this.imagesBDD) {
      this.clearFormArray(this.imagesBDD);
    }
    this.images = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push(e.target.result);
          this.addItem(file.name);
          this.formData.append('file', file);
        }
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit() {
    this.artService.postArticle(this.articleForm.value).subscribe(
      (response) => {
        this.toaster.show('success', 'Ajout réussi');
      },
      (error) => {
        this.toaster.show('danger', 'Une erreur est survenue');
      });

    this.uploadService.upload(this.formData).subscribe(
      (res) =>{ 
        if(res == null)  this.toaster.show('success', "Upload des images réussi");
      },
      (err) => {this.toaster.show('danger', "Une erreur est survenue lors de l'upload des images")}
    );
  }

}
