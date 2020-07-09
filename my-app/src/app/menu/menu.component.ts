import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_auth/token-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoggedIn = false;


  constructor(
    private tokenStorageService: TokenStorageService
  ) { }

  
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  deconnexion() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
