export class SignupInfo {

  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  role: string[];


  constructor(firstname: string, lastname: string, email: string, phone: string, password: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.role = ['patient'];
  }
}
