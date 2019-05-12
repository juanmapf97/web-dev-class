
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
  MatListModule,
  MatStepperModule,
  MatToolbarModule,
  MatCardModule,
  MatGridListModule,
  MatPaginatorModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { InfoFormComponent } from './components/info-form/info-form.component';
import {
  MatBottomSheetModule,
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
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    InfoFormComponent,
    RequestsListComponent,
    ToolbarComponent
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
    CdkTableModule,
    MatBottomSheetModule,
    MatCheckboxModule,
    MatSnackBarModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatListModule,
    MatNativeDateModule,
    MatStepperModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
