import { Component, OnInit } from '@angular/core';
import {User} from '../user.model';
import {UserService} from '../user.service';
import {TokenStorageService} from '../../common/auth/token-storage.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  isAdmin: boolean;
  isEditing = false;
  form: any = {};
  pickedDentist: User = new User();

  constructor(private userService: UserService,
              private tokenStorage: TokenStorageService,
              private service: UserService) { }

  ngOnInit(): void {
    this.isAdmin = this.tokenStorage.getAuthorities().includes('ADMIN');
    this.getPatients();
  }

  getPatients(): void {
    this.userService.getPatients()
      .subscribe(users => this.users = users);
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
