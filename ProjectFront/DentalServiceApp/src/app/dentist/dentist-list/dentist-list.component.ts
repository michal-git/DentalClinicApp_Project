import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user/user.service';
import {User} from '../../user/user.model';
import {TokenStorageService} from '../../common/auth/token-storage.service';

@Component({
  selector: 'app-dentist-list',
  templateUrl: './dentist-list.component.html',
  styleUrls: ['./dentist-list.component.css'],
  providers: [UserService]
})
export class DentistListComponent implements OnInit {
  isAdmin: boolean;
  dentists: User[] = [];
  isEditing = false;
  form: any = {};
  pickedDentist: User = new User();

  constructor(private userService: UserService,
              private tokenStorage: TokenStorageService,
              private service: UserService) { }

  ngOnInit(): void {
    this.isAdmin = this.tokenStorage.getAuthorities().includes('ADMIN');
    this.getDentists();
  }

  getDentists(): void {
    this.userService.getDentists()
      .subscribe(dentists => this.dentists = dentists);
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
