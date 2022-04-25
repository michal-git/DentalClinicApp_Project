import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Appointment} from './appointment.model';
import {AppointmentInfo} from './appointment-info';
import {DentalService} from '../dental-service/dental-service.model';
import {MyAccountInfo} from '../my-account/my-account-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = 'http://localhost:8080/restApi/appointments';

  constructor(private http: HttpClient) { }

  /** GET all appointments of principal user from the server */
  getMyAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.baseUrl + '/my-appointments');
  }

  createAppointment(info: AppointmentInfo): Observable<string> {
    return this.http.post<string>(this.baseUrl + '/create', info);
  }

  createAppointmentByDentist(info: AppointmentInfo): Observable<string> {
    return this.http.post<string>(this.baseUrl + '/dentist/create', info);
  }

  getDentistAppointments(dentistId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.baseUrl + '/dentist-appointments?dentistId=' + dentistId);
  }

  cancel(appId: number): Observable<DentalService> {
    // @ts-ignore
    return this.http.patch<DentalService>(this.baseUrl + '/cancel?id=' + appId);
  }

  done(appId: number): Observable<DentalService> {
    // @ts-ignore
    return this.http.patch<DentalService>(this.baseUrl + '/done?id=' + appId);
  }
}
