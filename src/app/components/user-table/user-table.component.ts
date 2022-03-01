import { UsersService } from '../../services/users/users.service';
import { IUser } from './../../Models/iuser';
import { Component, OnInit } from '@angular/core';
import { faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  faTrash = faTrash;
  faSearch = faSearch;
  UsersList: IUser[] = [];
  SubScriptionArray: Subscription[] = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  searchText: string = '';
  DeleteMessage: string = '';
  DeleteUserId: string = '';
  MessageShow: boolean = false;
  constructor(private UserService: UsersService) {}

  ngOnInit(): void {
    this.GetUsers();
  }

  ngOnDestroy(): void {
    for (let SubScripe of this.SubScriptionArray) {
      SubScripe.unsubscribe();
    }
  }

  GetUsers(): void {
    let UsersObserver = this.UserService.GetAllUsers().subscribe(
      (data: any) => {
        this.UsersList = data.map((user: any) => {
          return {
            id: user.payload.doc.id,
            ...user.payload.doc.data(),
          };
        });
      }
    );
    this.count = this.UsersList.length;
    this.SubScriptionArray.push(UsersObserver);
  }

  Deleteuser(id: string) {
    this.UserService.Deleteuser(id)
      .then(() => {
        this.DeleteMessage = 'The user delete successfully!';
        setTimeout(() => {
          this.MessageShow = true;
        }, 1000);
        setTimeout(() => {
          this.MessageShow = false;
        }, 5000);
      })
      .catch((err) => console.log(err));
    console.log(id);
  }
}
