import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { RegistrationFormComponent } from './components/auth/registration-form/registration-form.component';
import { InfoFormComponent } from './components/info-form/info-form.component';
import { ReceiveFormComponent } from './components/receive-form/receive-form.component';
import { RequestsListComponent } from './components/platform/requests-list/requests-list.component';
import { RequestDetailComponent } from './components/platform/request-detail/request-detail.component';


const routes: Routes = [
  {
    path: 'app',
    // component: LoginFormComponent
    redirectTo: 'auth/registration'
  },
  {
    path: 'app/requests',
    component: RequestsListComponent
  },
  {
    path: 'app/detail/:id',
    component: RequestDetailComponent
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
  {
    path: 'receive-form',
    component: ReceiveFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }