import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DentalService} from './dental-service.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DentalServiceService {

  private baseUrl = 'http://localhost:8080/restApi/dental-service';

  constructor(private http: HttpClient) { }

  /** GET all dental services from the server */
  getDentalServices(): Observable<DentalService[]> {
    return this.http.get<DentalService[]>(this.baseUrl + '/all');
  }

  getOneDentalService(serviceId: number): Observable<DentalService> {
    const params = new HttpParams()
      .set('serviceId', String(serviceId));
    return this.http.get<DentalService>(this.baseUrl + '/get-one', {params});
  }

  /** POST: add a new dental service to the server */
  addDentalService(dentalService: DentalService): Observable<DentalService> {
    return this.http.post<DentalService>(this.baseUrl + '/add', dentalService, httpOptions);
  }

  /** PATCH: update dental service to the server */
  disableDentalService(serviceId: number): Observable<DentalService> {
    // @ts-ignore
    return this.http.patch<DentalService>(this.baseUrl + '/disable?id=' + serviceId);
  }

  /** PATCH: update dental service to the server */
  enableDentalService(serviceId: number): Observable<DentalService> {
    const params = new HttpParams()
      .set('serviceId', String(serviceId));
    return this.http.patch<DentalService>(this.baseUrl + '/enable', {params}, httpOptions);
  }

  /** PATCH: update dental service to the server */
  updatePrice(serviceId: number, price: number): Observable<DentalService> {
    // @ts-ignore
    return this.http.patch<DentalService>(this.baseUrl + '/update-price?id=' + serviceId + '&price=' + price);
  }
}
