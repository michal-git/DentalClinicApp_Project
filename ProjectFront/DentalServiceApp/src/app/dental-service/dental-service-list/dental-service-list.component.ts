import { Component, OnInit } from '@angular/core';
import {DentalServiceService} from '../dental-service.service';
import {DentalService} from '../dental-service.model';
import {TokenStorageService} from '../../common/auth/token-storage.service';

@Component({
  selector: 'app-dental-service-list',
  templateUrl: './dental-service-list.component.html',
  styleUrls: ['./dental-service-list.component.css'],
  providers: [DentalServiceService]
})
export class DentalServiceListComponent implements OnInit {
  isAdmin: boolean;
  dentalServices: DentalService[] = [];
  isEditing = false;
  form: any = {};
  pickedService: DentalService = null;

  constructor(private service: DentalServiceService,
              private dentalServiceService: DentalServiceService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.isAdmin = this.tokenStorage.getAuthorities().includes('ADMIN');
    this.getDentalServices();
  }

  getDentalServices(): void {
    this.dentalServiceService.getDentalServices()
      .subscribe(dentalServices => this.dentalServices = dentalServices);
  }

  disableDentalService(serviceId: number): void {
    this.service.disableDentalService(serviceId).subscribe(
      () => {
        location.reload();
      }
    );
  }

  enableDentalService(serviceId: number): void {
    this.service.enableDentalService(serviceId).subscribe(
      () => {
        location.reload();
      }
    );
  }

  getOne(serviceId: number): void {
    this.service.getOneDentalService(serviceId)
      .subscribe(pickedService => this.pickedService = pickedService);
    this.isEditing = true;
  }

  updatePrice(): void {
    this.service.updatePrice(this.pickedService.serviceId, this.form.price).subscribe(
      () => {
        location.reload();
      }
    );
  }

  onCancel(): void {
    this.isEditing = false;
  }

  onConfirm(): void {
    this.updatePrice();
    this.isEditing = false;
  }
}
