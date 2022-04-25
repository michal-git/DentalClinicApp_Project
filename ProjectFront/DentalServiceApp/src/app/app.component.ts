import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './common/auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DentalServiceAppFront';
  private roles: string[];
  public authority: string;
  isLoggedIn = false;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ADMIN') {
          this.authority = 'admin';
        } else if (role === 'DENTIST') {
          this.authority = 'dentist';
        } else {
          this.authority = 'patient';
        }
      });
    }
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
