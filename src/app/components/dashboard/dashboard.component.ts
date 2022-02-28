import { IUser } from './../../Models/iuser';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import {
  faUser,
  faBuilding,
  faBriefcase,
  faPaperclip,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  faUser = faUser;
  faBuilding = faBuilding;
  faBriefcase = faBriefcase;
  faArrowAltCircleRight = faArrowAltCircleRight;
  faPaperclip = faPaperclip;
  TotalUsers: number = 0;
  UsersList: IUser[] = [];
  SubScriptionArray: Subscription[] = [];

  constructor(private UserService: UsersService) {}

  ngOnInit(): void {
    this.GetTotalUsers();
  }
  ngOnDestroy(): void {
    for (let SubScripe of this.SubScriptionArray) {
      SubScripe.unsubscribe();
    }
  }
  GetTotalUsers(): void {
    let UsersObserver = this.UserService.GetAllUsers().subscribe(
      (data: any) => {
        data.map((user: any) => {
          this.UsersList.push(user);
          console.log(user);
        });
        this.TotalUsers = this.UsersList.length;
      }
    );

    this.SubScriptionArray.push(UsersObserver);
  }
}
