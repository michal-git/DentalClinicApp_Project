import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../common/auth/token-storage.service';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';
import {MyAccountInfo} from './my-account-info';
import {User} from '../user/user.model';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  public accountInfo: MyAccountInfo = new MyAccountInfo();
  isEditing = false;
  form: any = {};

  constructor(private tokenStorage: TokenStorageService,
              private router: Router,
              private service: UserService) { }

  ngOnInit(): void {
    if (this.tokenStorage.tokenExists()) {
      this.router.navigateByUrl('/my-account');
    } else {
      this.router.navigateByUrl('/login');
    }
    this.getCurrentUser();
    console.log(this.accountInfo);
  }

  getCurrentUser(): void {
    this.service.getMyProfile()
      .subscribe(info => this.accountInfo = info);
  }

   onEdit(): void {
    this.isEditing = true;
  }

   onConfirm(): void {
    this.updateCurrentUser();
    this.isEditing = false;
  }

  private updateCurrentUser(): void {
    this.service.updateUser(this.accountInfo.userId, this.form.phone).subscribe(
      () => {
        location.reload();
      }
    );
  }

  onCancel(): void {
    this.isEditing = false;
  }
}
