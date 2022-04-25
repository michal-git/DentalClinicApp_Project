import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../common/auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  isAdding: boolean;

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.tokenExists()) {
      this.router.navigateByUrl('/admin');
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
