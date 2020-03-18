import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  listeArticles: Article[];

  constructor(
    private articleService: ArticleService,
    private toaster: ToasterService
  ) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService.getArticles().subscribe(articles => {
      this.listeArticles = articles;
    });
  }

  supprimerArticle(id: number){
    if(confirm("Supprimer ?")) {
      this.articleService.supprArticle(id).subscribe(
        (response)=>{
          this.toaster.show('success', 'suppression réalisée avec succes');
        },
        (error)=>{
          this.toaster.show('danger', 'Une erreur est survenue');
        });;
      this.getArticles();
    }
  }
} 
