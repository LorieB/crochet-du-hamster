import { Component, OnInit } from '@angular/core';
import { Article } from '../_share/article';
import { ArticleService } from '../_services/article.service';
import { ToasterService } from '../_services/toaster.service';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  listeArticles: Article[];
  articleSelect: Article;
  baseUrlImg = environment.imageUrl;

  idASuppr = null;

  constructor(
    private articleService: ArticleService,
    private toaster: ToasterService
  ) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.subscription.add(this.articleService.getArticles().subscribe(articles => {
      this.listeArticles = articles;
    }));
  }

  selectSupprArticle(id: number): void {
    this.idASuppr = id;
  }

  supprimerArticle() {
    this.subscription.add(this.articleService.supprArticle(this.idASuppr).subscribe(
      (response) => {
        this.toaster.show('success', 'suppression réalisée avec succes');
        this.getArticles();
      },
      (error) => {
        this.toaster.show('danger', error.error.message);
      }));
  }

  modifierArticle(article: Article): void {
    this.articleSelect = article;
  }

  annulerModif(): void {
    this.articleSelect = null;
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
} 
