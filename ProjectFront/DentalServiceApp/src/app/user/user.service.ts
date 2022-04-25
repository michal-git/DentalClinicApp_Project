import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from './user.model';
import {MyAccountInfo} from '../my-account/my-account-info';
import {SignupInfo} from '../common/auth/signup-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/restApi/users';

  constructor(private http: HttpClient) { }

  /** GET all patients from the server */
  getPatients(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/all-patients');
  }

  /** GET all dentists from the server */
  getDentists(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/all-dentists');
  }

  /** GET all admins from the server */
  getAdmins(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/all-admins');
  }

  /** GET principle user from the server */
  getMyProfile(): Observable<MyAccountInfo> {
    return this.http.get<MyAccountInfo>(this.baseUrl + '/my-profile');
  }

  /** PUT user phone */
  updateUser(userId: number, phone: string): Observable<MyAccountInfo> {
    const params = new HttpParams()
      .set('userId', String(userId))
      .set('phone', phone);
    return this.http.put<MyAccountInfo>(this.baseUrl + '/update-phone', params);
  }

  registerAdmin(info: SignupInfo): Observable<string> {
    return this.http.post<string>(this.baseUrl + '/add-admin', info, httpOptions);
  }

  registerDentist(info: SignupInfo): Observable<string> {
    return this.http.post<string>(this.baseUrl + '/add-dentist', info, httpOptions);
  }

  findOne(userId: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/get-one?userId=' + userId);
  }

  setBlocked(userId: number, blocked: boolean): Observable<User> {
    const params = new HttpParams()
      .set('userId', String(userId))
      .set('blocked', String(blocked));
    return this.http.put<User>(this.baseUrl + '/set-blocked', params);
  }
}
