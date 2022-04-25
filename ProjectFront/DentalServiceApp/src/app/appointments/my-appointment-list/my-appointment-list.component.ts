import { Component, OnInit } from '@angular/core';
import {Appointment} from '../appointment.model';
import {AppointmentService} from '../appointment.service';
import {TokenStorageService} from '../../common/auth/token-storage.service';

@Component({
  selector: 'app-my-appointment-list',
  templateUrl: './my-appointment-list.component.html',
  styleUrls: ['./my-appointment-list.component.css']
})
export class MyAppointmentListComponent implements OnInit {

  myAppointments: Appointment[] = [];
  isPatient: boolean;
  isDentist: boolean;

  constructor(private appService: AppointmentService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.isPatient = this.tokenStorage.getAuthorities().includes('PATIENT');
    this.isDentist = this.tokenStorage.getAuthorities().includes('DENTIST');
    this.getMyAppointments();
  }

  getMyAppointments(): void {
    this.appService.getMyAppointments()
      .subscribe(myAppointments => this.myAppointments = myAppointments);
  }

  onTrash(appId: number): void {
    this.appService.cancel(appId).subscribe(
      () => {
        location.reload();
      }
    );
  }

  onDone(appId: number): void {
    this.appService.done(appId).subscribe(
      () => {
        location.reload();
      }
    );
  }
}
