import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../_services/article.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css']
})
export class FiltreComponent implements OnInit {
  private subscription: Subscription;

  @Output() eventTri = new EventEmitter<object>();
  @Output() eventFiltre = new EventEmitter<object>();
  @Output() eventSupprFiltre = new EventEmitter<void>();

  filtreForm: FormGroup;

  matiere = [];
  categorie = [];

  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder
  ) { 
    this.filtreForm = this.fb.group({
      prix: [null, Validators.pattern("^[0-9]*$")],
      categorie: '',
      matiere: '',
      porteClef: false
    })
  }

  ngOnInit(): void {
    this.listeMatCat();
  }

  tri(options): void {
    this.eventTri.emit(options);
  }

  listeFiltres(): void {
    this.eventFiltre.emit(this.filtreForm.value);
  }

  supprFiltres(): void {
    this.eventSupprFiltre.emit();
  }

  listeMatCat(): void {
    this.subscription = this.articleService.getMatiereEtCategorie().subscribe(response => {
      this.matiere = response[0];
      this.categorie = response[1];
    })
  }

  resetPrix(): void {
    this.filtreForm.value.prix = null;
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
