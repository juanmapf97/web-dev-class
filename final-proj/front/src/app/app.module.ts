
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { RegistrationFormComponent } from './components/auth/registration-form/registration-form.component';
import { MatSelectModule } from '@angular/material/select';
import {  MatDatepickerModule, MatNativeDateModule, MatStepperModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { InfoFormComponent } from './components/info-form/info-form.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    InfoFormComponent,

  ],
  imports: [
    BrowserModule,
    MatDatepickerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatStepperModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
