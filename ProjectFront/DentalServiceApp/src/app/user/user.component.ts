import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../common/auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private isAdmin: boolean;

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.tokenExists()) {
      this.isAdmin = this.tokenStorage.getAuthorities().includes('ADMIN');
      this.router.navigateByUrl('/user');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
