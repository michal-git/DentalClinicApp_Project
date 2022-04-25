import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user/user.service';
import {User} from '../../user/user.model';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css'],
  providers: [UserService]
})
export class AdminListComponent implements OnInit {

  admins: User[] = [];
  isEditing = false;
  form: any = {};
  pickedDentist: User = new User();

  constructor(private userService: UserService,
              private service: UserService) { }

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins(): void {
    this.userService.getAdmins()
      .subscribe(admins => this.admins = admins);
  }

  setBlocked(userId: number): void {
    this.userService.setBlocked(userId, true).subscribe(
      () => {
        location.reload();
      }
    );
  }

  getOne(userId: number): void {
    this.userService.findOne(userId)
      .subscribe( pickedDentist => this.pickedDentist = pickedDentist);
    this.isEditing = true;
  }

  private updateUser(): void {
    this.service.updateUser(this.pickedDentist.userId, this.form.phone).subscribe(
      () => {
        location.reload();
      }
    );
  }

  onCancel(): void {
    this.isEditing = false;
  }

  onConfirm(): void {
    this.updateUser();
    this.isEditing = false;
  }
}
