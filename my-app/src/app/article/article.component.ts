import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service'
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  listeArticles: Article[];
  articlesAffiches: Article[];
  baseUrlImg = environment.imageUrl;

  constructor(
    private articleService: ArticleService
    ) { }

  ngOnInit(): void {
    this.getArticles();
  }


  getArticles():void {
    this.articleService.getArticles().subscribe(articles => {
      for(let art of articles){
        art.dateCreation = new Date(art.dateCreation);
      }
      this.listeArticles = articles;
      this.articlesAffiches = articles;
    });
  }

  tri(options): void {
    /* sort() - au + */
    this.articlesAffiches = this.articlesAffiches.sort((a, b) => {
      return a[options.param] - b[options.param];
    });
    
    if(options.plusAmoins){
      this.articlesAffiches = this.articlesAffiches.reverse();
    }
  }

  supprFiltre() {
    this.articlesAffiches = this.listeArticles;
  }

  filtrerArticles(event) {
    this.articlesAffiches = this.listeArticles.filter(art => {
      if (event.prix != null && art.prix > event.prix ){
        return false;
      }
      if (event.categorie != '' && event.categorie != null && art.categorie != event.categorie ){
        return false;
      }
      if (event.matiere != '' && event.matiere != null && art.matiere.findIndex(mat => mat == event.matiere) == -1){
        return false;
      }
      if (event.porteClef && !art.porteClef){
        return false;
      }
      return true;
    });
  }

}
