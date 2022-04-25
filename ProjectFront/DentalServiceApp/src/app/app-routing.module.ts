import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './common/home/home.component';
import {UserComponent} from './user/user.component';
import {AdminPanelComponent} from './admin/admin-panel.component';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {AppointmentComponent} from './appointments/appointment.component';
import {DentistComponent} from './dentist/dentist.component';
import {DentalServiceComponent} from './dental-service/dental-service.component';
import {MyAccountComponent} from './my-account/my-account.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'admin',
    component: AdminPanelComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'appointment',
    component: AppointmentComponent
  },
  {
    path: 'dental-service',
    component: DentalServiceComponent
  },
  {
    path: 'dentist',
    component: DentistComponent
  },
  {
    path: 'my-account',
    component: MyAccountComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
