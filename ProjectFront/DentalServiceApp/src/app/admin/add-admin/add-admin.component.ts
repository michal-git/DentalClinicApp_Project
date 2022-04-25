import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user/user.service';
import {SignupInfo} from '../../common/auth/signup-info';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  form: any = {};
  signupInfo: SignupInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.signupInfo = new SignupInfo(
      this.form.firstname,
      this.form.lastname,
      this.form.email,
      this.form.phone,
      this.form.password);

    this.userService.registerAdmin(this.signupInfo).subscribe(
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
