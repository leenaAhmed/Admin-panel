import { IAdmin } from './../../Models/iadmin';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from 'src/app/services/auth/adminAuth.service';
import { Iadmin } from 'src/app/model/iadmin';

export const ROUTES: any[] = [
  { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: 'admin', title: 'Companies', icon: 'library_books', class: '' },
  {
    path: 'usertable',
    title: 'Users',
    icon: 'person',
    class: '',
  },
  {
    path: 'company',
    title: 'Jobs',
    icon: ' content_paste',
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

  AdminsList: Iadmin = {} as Iadmin;
  constructor(private authService: AdminAuthService) {}

  ngOnInit(): void {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.GetUsers();
  }
  sidebarToggle() {
    this.isOpen = !this.isOpen;
  }

  GetUsers(): void {
    this.authService.getUser()?.subscribe((data) => {
      this.AdminsList = data;
    });
    // this.SubScriptionArray.push(UsersObserver);
  }
}
