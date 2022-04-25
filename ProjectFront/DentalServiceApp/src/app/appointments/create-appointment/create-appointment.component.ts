import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user/user.service';
import {User} from '../../user/user.model';
import {DentalServiceService} from '../../dental-service/dental-service.service';
import {DentalService} from '../../dental-service/dental-service.model';
import {SignupInfo} from '../../common/auth/signup-info';
import {AppointmentService} from '../appointment.service';
import {AppointmentInfo} from '../appointment-info';
import {TokenStorageService} from '../../common/auth/token-storage.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {

  dentists: User[] = [];
  patients: User[] = [];
  dentalServices: DentalService[] = [];
  appInfo: AppointmentInfo;
  form: any = {};
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  isPatient: boolean;
  isDentist: boolean;

  constructor(private userService: UserService,
              private dentalServiceService: DentalServiceService,
              private appointmentService: AppointmentService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.isPatient = this.tokenStorage.getAuthorities().includes('PATIENT');
    this.isDentist = this.tokenStorage.getAuthorities().includes('DENTIST');
    this.getDentists();
    this.getPatients();
    this.getDentalServices();
  }

  getDentists(): void {
    this.userService.getDentists()
      .subscribe(dentists => this.dentists = dentists);
  }

  getPatients(): void {
    this.userService.getPatients()
      .subscribe(patients => this.patients = patients);
  }

  getDentalServices(): void {
    this.dentalServiceService.getDentalServices()
      .subscribe(dentalServices => this.dentalServices = dentalServices);
  }

  onSubmit(): void {
    if (this.isPatient) {
      this.appInfo = new AppointmentInfo(
        this.form.clientDescription,
        this.form.time,
        this.form.dentist,
        this.form.serviceId
      );

      this.appointmentService.createAppointment(this.appInfo).subscribe(
        data => {
          this.isSignedUp = true;
          this.isSignUpFailed = false;
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
        }
      );
    } else if (this.isDentist) {
      this.appInfo = new AppointmentInfo(
        this.form.clientDescription,
        this.form.time,
        this.form.patient,
        this.form.serviceId
      );

      this.appointmentService.createAppointmentByDentist(this.appInfo).subscribe(
        data => {
          this.isSignedUp = true;
          this.isSignUpFailed = false;
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
        }
      );
    }
  }
}
