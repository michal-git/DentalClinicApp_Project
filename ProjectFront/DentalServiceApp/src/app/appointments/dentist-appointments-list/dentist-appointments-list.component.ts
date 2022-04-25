import { Component, OnInit } from '@angular/core';
import {AppointmentService} from '../appointment.service';
import {Appointment} from '../appointment.model';
import {UserService} from '../../user/user.service';
import {User} from '../../user/user.model';

@Component({
  selector: 'app-dentist-appointments-list',
  templateUrl: './dentist-appointments-list.component.html',
  styleUrls: ['./dentist-appointments-list.component.css']
})
export class DentistAppointmentsListComponent implements OnInit {

  dentistAppointments: Appointment[] = [];
  dentists: User[] = [];
  form: any = {};
  pickedDentist: User = new User();

  constructor(private userService: UserService,
              private appService: AppointmentService) { }

  ngOnInit(): void {
    this.getDentists();
  }

  getDentistAppointments(dentistId: number): void {
    this.appService.getDentistAppointments(dentistId)
      .subscribe(dentistAppointments => this.dentistAppointments = dentistAppointments);
  }

  getDentists(): void {
    this.userService.getDentists()
      .subscribe(dentists => this.dentists = dentists);
  }

  getOne(): void {
    this.userService.findOne(this.form.dentist)
      .subscribe( pickedDentist => this.pickedDentist = pickedDentist);
  }

  onSubmit(): void {
    this.getOne();
    this.getDentistAppointments(this.form.dentist);
  }

  onTrash(appId: number): void {
    this.appService.cancel(appId).subscribe(
      () => {
        location.reload();
      }
    );
  }
}
