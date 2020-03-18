import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Article } from './article';
 
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // serverUrl = "https://localhost:8000/";
  serverUrl = "https://crochet-du-hamster.fr";
  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.serverUrl+"/articles");
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(this.serverUrl+"/articles/" + id);
  }

  getMatiereEtCategorie(): Observable<any> {
    return this.http.get<any>(this.serverUrl+'/matCat/');
  }

  postArticle(article: any): Observable<any> {
    return this.http.post<any>(this.serverUrl+'/ajout', article)
  }

  supprArticle(id: number): Observable<any> {
    return this.http.get<any>(this.serverUrl+'/suppr/'+id)
  }
}
