import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from './api.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,

    AppRoutingModule,

    NgbModule.forRoot(),
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
