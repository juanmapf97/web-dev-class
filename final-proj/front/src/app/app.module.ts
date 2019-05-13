
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from "./guards/auth-guard.service";

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
import { ReceiveFormComponent } from './components/receive-form/receive-form.component';
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
import { RequestDetailComponent } from './components/platform/request-detail/request-detail.component';
import { CdkTableModule } from '@angular/cdk/table';
import { ProfileComponent } from './components/platform/profile/profile.component';
import { ContenteditableModule } from '@ng-stack/contenteditable';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    InfoFormComponent,
    RequestsListComponent,
    ToolbarComponent,
    RequestDetailComponent,
    ReceiveFormComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    MatDatepickerModule,
    ContenteditableModule,
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
    MatPaginatorModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
