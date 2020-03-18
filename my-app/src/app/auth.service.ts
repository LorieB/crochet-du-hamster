import { Injectable } from '@angular/core';
import { Utilisateur } from './utilisateur';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // serverUrl: string = 'http://localhost:8000';
  serverUrl: string = 'https://crochet-du-hamster.fr';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }


  signIn(utilisateur: Utilisateur) {
    return this.http.post<any>(`${this.serverUrl}/connexion`, utilisateur);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['articles']);
    }
  }

}

