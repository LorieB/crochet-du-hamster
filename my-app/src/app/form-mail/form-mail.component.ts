import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from '../toaster.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-mail',
  templateUrl: './form-mail.component.html',
  styleUrls: ['./form-mail.component.css']
})
export class FormMailComponent implements OnInit {
  mailForm: FormGroup;
  model = {expediteur: '', sujet: '', message: ''};
  
  // serverUrl = "https://localhost:8000/";
  serverUrl = "https://crochet-du-hamster.fr";

  constructor(
    private http: HttpClient,
    public toaster: ToasterService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.mailForm = this.fb.group({
      expediteur: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]], 
      sujet: ['', Validators.required], 
      message: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  onSubmit(): void {
    this.http.post(`${this.serverUrl}/contact`, this.mailForm.value).subscribe(
      (response) => {
        this.toaster.show('success', 'Mail envoyé !');
      },
      (error) => {
        this.toaster.show('danger', "Echec de l'envoie du mail");
      }
    );
  }
}
