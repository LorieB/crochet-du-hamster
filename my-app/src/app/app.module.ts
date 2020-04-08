import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthInterceptor } from './authconfig.interceptor';

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { MenuComponent } from './menu/menu.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { FormMailComponent } from './form-mail/form-mail.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AdministrationComponent } from './administration/administration.component';
import { FormArticleComponent } from './form-article/form-article.component';
import { ToasterContainerComponent } from './toaster/toaster-container.component';
import { ToasterComponent } from './toaster/toaster.component';
import { FooterComponent } from './footer/footer.component';
import { FiltreComponent } from './filtre/filtre.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticleDetailComponent,
    MenuComponent,
    FaqComponent,
    ContactComponent,
    FormMailComponent,
    ConnexionComponent,
    AdministrationComponent,
    FormArticleComponent,
    ToasterContainerComponent,
    ToasterComponent,
    FooterComponent,
    FiltreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
