import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../common/auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  isPatient: boolean;
  isDentist: boolean;
  isAdmin: boolean;
  isCreating: boolean;

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.tokenExists()) {
      this.isPatient = this.tokenStorage.getAuthorities().includes('PATIENT');
      this.isDentist = this.tokenStorage.getAuthorities().includes('DENTIST');
      this.isAdmin = this.tokenStorage.getAuthorities().includes('ADMIN');
      this.router.navigateByUrl('/appointment');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  onAdd(): void {
    this.isCreating = true;
  }

  onCancel(): void {
    this.isCreating = false;
  }
}
