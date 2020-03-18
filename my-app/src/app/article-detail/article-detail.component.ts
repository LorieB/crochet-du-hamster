import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  article: Article = {id: 0 ,titre: '',texte: '',image: [''],descriptionImg: [''],matiere: [''], categorie:'', porteClef: null, dispo: '', prix: null, dateCreation: null};

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.getArticle(id).subscribe(article => {
      if(article === null){
        this.router.navigateByUrl('');
        return;
      }
      this.article = article;
    });
  }
}
