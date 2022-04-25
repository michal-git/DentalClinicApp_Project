import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../common/auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dentist',
  templateUrl: './dentist.component.html',
  styleUrls: ['./dentist.component.css']
})
export class DentistComponent implements OnInit {

  isAdding: boolean;
  isAdmin: boolean;

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.tokenExists()) {
      this.isAdmin = this.tokenStorage.getAuthorities().includes('ADMIN');
      this.router.navigateByUrl('/dentist');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  onAdd(): void {
    this.isAdding = true;
  }

  onCancel(): void {
    this.isAdding = false;
  }
}
