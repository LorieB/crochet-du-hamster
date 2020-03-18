import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  connexionForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public toaster: ToasterService
  ) { 
    this.connexionForm = this.fb.group({
      nom: ['', Validators.required],
      mdp: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.signIn(this.connexionForm.value).subscribe(
      (response) => {
        localStorage.setItem('access_token', response.token);
        this.router.navigate(['/administration']);
      },
      (error) => {
        this.toaster.show('danger', 'Connexion refusée');
      }
    )
  }
}
