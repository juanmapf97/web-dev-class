import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { RegistrationFormComponent } from './components/auth/registration-form/registration-form.component';
import { InfoFormComponent } from './components/info-form/info-form.component';
import { RequestsListComponent } from './components/platform/requests-list/requests-list.component';


const routes: Routes = [
  {
    path: 'app',
    component: RequestsListComponent
    // redirectTo: 'auth/registration'
  },
  {
    path: 'auth/login',
    component: LoginFormComponent
  },
  {
    path: 'auth/registration',
    component: RegistrationFormComponent
  },
  {
    path: 'info-form',
    component: InfoFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
