import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Article } from '../_share/article';
import { TokenStorageService } from '../_auth/token-storage.service';
 
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
    ) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(environment.serverUrl+"/articles");
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(environment.serverUrl+"/articles/" + id);
  }

  getMatiereEtCategorie(): Observable<any> {
    return this.http.get<any>(environment.serverUrl+'/matCat/');
  }

  postArticle(article: any): Observable<any> {
    return this.http.post<any>(environment.serverUrl+'/ajout', article)
  }

  modifArticle(article: any, id: number): Observable<any> {
    return this.http.post<any>(environment.serverUrl+'/modif/'+id, article)
  }

  supprArticle(id: number): Observable<any> {
    return this.http.get<any>(environment.serverUrl+'/suppr/'+id)
  }
}
