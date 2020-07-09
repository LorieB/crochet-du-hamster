import { Component, OnInit, Input, SimpleChange, Output } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms'
import { ArticleService } from '../_services/article.service';
import { ToasterService } from '../_services/toaster.service';
import { UploadService } from '../_services/upload.service';
import { Article } from '../_share/article';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-article',
  templateUrl: './form-article.component.html',
  styleUrls: ['./form-article.component.css']
})
export class FormArticleComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  @Input() articleAModifier: Article;
 
  baseUrlImg = environment.imageUrl;

  articleForm: FormGroup = this.fb.group({
    titre: ['', Validators.required],
    dateCreation: [null, Validators.required],
    texte: ['', Validators.required],

    matiere: [[''], Validators.required],
    categorie: ['', Validators.required],
    porteClef: [false, Validators.required],

    dispo: ['', Validators.required],
    prix: [null],

    imagesBDD: this.fb.array([]),  // Nom et description de l'img à mettre en BDD
    imagesSuppr: [null], // Liste d'images qui seront supprimées à la modification
  });

  imagesBDD: FormArray;

  formData = new FormData();

  images = new Array<String>();
  imgSuppr = new Array<string>();

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

  }

  /* Modification d'un article */
  ngOnChanges() {
    this.articleForm.patchValue({
      titre: this.articleAModifier.titre,
      dateCreation: this.articleAModifier.dateCreation,
      texte: this.articleAModifier.texte,
      matiere: this.articleAModifier.matiereID,
      categorie: this.articleAModifier.categorieID,
      porteClef: this.articleAModifier.porteClef,
      dispo: this.articleAModifier.dispo.toString(),
      prix: this.articleAModifier.prix,
    });
  }

  /* Récupère les listes de matières et categories pour les mettre dans les <select> du formulaire */
  getMatCat() {
    this.subscription.add(this.artService.getMatiereEtCategorie().subscribe(response => {
      this.matieres = response[0];
      this.categories = response[1];
    }))
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
      formArray.removeAt(0);
      this.formData.delete('file');
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
    if (this.articleAModifier) {
      this.articleForm.get('imagesSuppr').setValue(this.imgSuppr);
      this.subscription.add(this.artService.modifArticle(this.articleForm.value, this.articleAModifier.id).subscribe(
        (response) => {
          this.toaster.show('success', 'Modification réussi');
        },
        (error) => {
          this.toaster.show('danger', error.error.message);
        }));
    }
    else {
      this.subscription.add(this.artService.postArticle(this.articleForm.value).subscribe(
        (response) => {
          this.toaster.show('success', 'Ajout réussi');
        },
        (error) => {
          this.toaster.show('danger', error.error.message);
        }));
    }

    if (this.articleForm.value.imagesBDD.length > 0) {
      this.subscription.add(this.uploadService.upload(this.formData).subscribe(
        (res) => {
          if (res == null) this.toaster.show('success', "Upload des images réussi");
        },
        (err) => { 
          this.toaster.show('danger', err.error.message);
        }
      ));
    }
  }

  annulerModif(): void {
    this.articleAModifier = null;
  }

  supprimerImage(image: string): void {
    this.imgSuppr.push(image);
  }

  annulerSupprimerImage(image: string): void{
    this.imgSuppr.splice(this.imgSuppr.indexOf(image), 1);
  }


  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}


