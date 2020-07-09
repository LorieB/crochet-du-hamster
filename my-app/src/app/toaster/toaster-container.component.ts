import { Component, Input, OnInit } from '@angular/core';
import { ToasterService } from '../_services/toaster.service';
import { Toast } from './toast.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toaster-container',
  template: `
      <app-toaster *ngFor="let toast of toasts; let i=index" 
        [toast]="toast" [i]="i"
        (remove)="remove($event)"></app-toaster>`,
  styles: []
})


export class ToasterContainerComponent implements OnInit {
  private subscription: Subscription;

  toasts: Toast[] = [];

  constructor(public toaster: ToasterService) { }

  ngOnInit() {
    this.subscription = this.toaster.toast$
      .subscribe(toast => {
        this.toasts = [toast, ...this.toasts];
        setTimeout(() => this.toasts.pop(), toast.delay || 60000);
      });
  }

  remove(index: number) {
    this.toasts = this.toasts.filter((v, i) => i !== index);
    //this.toasts.splice(index, 1);
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}