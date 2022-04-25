import { Component, OnInit } from '@angular/core';
import {SignupInfo} from '../../common/auth/signup-info';
import {AuthService} from '../../common/auth/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignupInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  onSubmit(): void {
    this.signupInfo = new SignupInfo(
      this.form.firstname,
      this.form.lastname,
      this.form.email,
      this.form.phone,
      this.form.password);

    this.authService.signUp(this.signupInfo).subscribe(
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
    this.router.navigateByUrl('/login');
  }
}
