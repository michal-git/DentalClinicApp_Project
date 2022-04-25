import { Component, OnInit } from '@angular/core';
import {DentalServiceService} from './dental-service.service';
import {DentalService} from './dental-service.model';
import {TokenStorageService} from '../common/auth/token-storage.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dental-service',
  templateUrl: './dental-service.component.html',
  styleUrls: ['./dental-service.component.css'],
  providers: [DentalServiceService]
})
export class DentalServiceComponent implements OnInit {
  serviceList: DentalService[] = [];
  form: any = {};
  private serviceInfo: DentalService;
  isAdmin: boolean;

  constructor(private service: DentalServiceService,
              private tokenStorage: TokenStorageService,
              private router: Router) {  }

  ngOnInit(): void {
    if (this.tokenStorage.tokenExists()) {
      this.isAdmin = this.tokenStorage.getAuthorities().includes('ADMIN');
      this.router.navigateByUrl('/dental-service');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  addService(price: number, description: string): void {
    this.service.addDentalService({price, description} as DentalService)
      .subscribe(service => this.serviceList.push(service));
  }

  onSubmit(): void{
    this.serviceInfo = new DentalService(this.form.price, this.form.description);

    this.addService(this.serviceInfo.price, this.serviceInfo.description);
    location.reload();
  }
}
