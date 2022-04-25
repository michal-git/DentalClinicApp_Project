import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { httpInterceptorProviders } from './common/auth/auth-interceptor';
import { AppComponent } from './app.component';
import { HomeComponent } from './common/home/home.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/register/register.component';
import { AdminPanelComponent } from './admin/admin-panel.component';
import { LoginComponent } from './user/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { DentalServiceComponent } from './dental-service/dental-service.component';
import { AppointmentComponent } from './appointments/appointment.component';
import { DentistComponent } from './dentist/dentist.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { DentistListComponent } from './dentist/dentist-list/dentist-list.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { DentalServiceListComponent } from './dental-service/dental-service-list/dental-service-list.component';
import { AddDentistComponent } from './dentist/add-dentist/add-dentist.component';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import { CreateAppointmentComponent } from './appointments/create-appointment/create-appointment.component';
import { MyAppointmentListComponent } from './appointments/my-appointment-list/my-appointment-list.component';
import { DentistAppointmentsListComponent } from './appointments/dentist-appointments-list/dentist-appointments-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dental-service', component: DentalServiceComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'dentist', component: DentistComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    RegisterComponent,
    AdminPanelComponent,
    LoginComponent,
    DentalServiceComponent,
    AppointmentComponent,
    DentistComponent,
    MyAccountComponent,
    UserListComponent,
    DentistListComponent,
    AdminListComponent,
    DentalServiceListComponent,
    AddDentistComponent,
    AddAdminComponent,
    CreateAppointmentComponent,
    MyAppointmentListComponent,
    DentistAppointmentsListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
