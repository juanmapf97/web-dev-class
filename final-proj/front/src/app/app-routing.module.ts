import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.service';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { RegistrationFormComponent } from './components/auth/registration-form/registration-form.component';
import { InfoFormComponent } from './components/info-form/info-form.component';
import { ReceiveFormComponent } from './components/receive-form/receive-form.component';
import { RequestsListComponent } from './components/platform/requests-list/requests-list.component';
import { RequestDetailComponent } from './components/platform/request-detail/request-detail.component';
import { ProfileComponent } from './components/platform/profile/profile.component';


const routes: Routes = [
  {
    path: 'app',
    redirectTo: 'app/requests'
  },
  {
    path: 'app/requests',
    component: RequestsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/detail/:id',
    component: RequestDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/login',
    component: LoginFormComponent
  },
  {
    path: 'auth/registration',
    component: RegistrationFormComponent,
  },
  {
    path: 'info-form',
    component: InfoFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'receive-form/:id',
    component: ReceiveFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'app/requests'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
