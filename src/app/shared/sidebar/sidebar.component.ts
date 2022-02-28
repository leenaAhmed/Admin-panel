import { IAdmin } from './../../Models/iadmin';
import { AdminService } from './../../Services/admin.service';
import { Component, OnInit } from '@angular/core';

export const ROUTES: any[] = [
  { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: 'admin', title: 'User Company', icon: 'person', class: '' },
  {
    path: 'usertable',
    title: 'User table',
    icon: 'content_paste',
    class: '',
  },
  {
    path: 'company',
    title: 'company',
    icon: 'library_books',
    class: '',
  },
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];
  isOpen: boolean = false;
  AdminsList:IAdmin[]=[];
  constructor(private AdminServ:AdminService) {}

  ngOnInit(): void {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.GetUsers();
  }
  sidebarToggle() {
    this.isOpen = !this.isOpen;
  }

  GetUsers(): void {
    let UsersObserver = this.AdminServ.GetAllAdmins().subscribe(
      (data: any) => {
        this.AdminsList = data.map((user: any) => {
          return {
            id: user.payload.doc.id,
            ...user.payload.doc.data(),
          };
          
        });console.log(this.AdminsList[0].name)
      }
    );
    // this.SubScriptionArray.push(UsersObserver);
  }
}
