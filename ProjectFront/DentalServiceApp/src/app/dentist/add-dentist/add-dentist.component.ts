import { Component, OnInit } from '@angular/core';
import {SignupInfo} from '../../common/auth/signup-info';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-add-dentist',
  templateUrl: './add-dentist.component.html',
  styleUrls: ['./add-dentist.component.css']
})
export class AddDentistComponent implements OnInit {
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

    this.userService.registerDentist(this.signupInfo).subscribe(
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
