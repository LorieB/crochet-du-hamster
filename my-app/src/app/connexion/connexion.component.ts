import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_auth/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from '../_services/toaster.service';
import { Subscription } from 'rxjs';
import { TokenStorageService } from '../_auth/token-storage.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  private subscription: Subscription;
  connexionForm: FormGroup;
  isLoggedIn = false;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private tokenStorage: TokenStorageService,
    public router: Router,
    public toaster: ToasterService
  ) { 
    this.connexionForm = this.fb.group({
      nom: ['', Validators.required],
      mdp: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    this.subscription = this.authService.login(this.connexionForm.value).subscribe(
      (response) => {
        this.tokenStorage.saveToken(response.accessToken);
        this.tokenStorage.saveUser(response);
        this.isLoggedIn = true;

        window.location.reload();
      },
      (error) => {
        this.toaster.show('danger', 'Connexion refusée');
      }
    )
  }
  
  
  ngOnDestroy(){
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
