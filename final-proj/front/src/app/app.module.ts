
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { RegistrationFormComponent } from './components/auth/registration-form/registration-form.component';
import { MatSelectModule } from '@angular/material/select';
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatStepperModule,
  MatToolbarModule,
  MatCardModule,
  MatGridListModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { InfoFormComponent } from './components/info-form/info-form.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatTableModule
} from '@angular/material';
import { RequestsListComponent } from './components/platform/requests-list/requests-list.component';
import { ToolbarComponent } from './components/platform/toolbar/toolbar.component';
import { RequestDetailComponent } from './components/platform/request-detail/request-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    InfoFormComponent,
    RequestsListComponent,
    ToolbarComponent,
    RequestDetailComponent
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
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
