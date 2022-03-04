import { IAdmin } from './../../Models/iadmin';
import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from 'src/app/Services/auth/adminAuth.service';
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
    path: 'jobpage/',
    title: 'Jobs',
    icon: ' content_paste',
    class: '',
  },
  {
    path: 'jobapplicationstable',
    title: 'Job Applications',
    icon: ' apps',
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
  FormIsOpen: boolean = false;

  ngOnInit(): void {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.GetUsers();
  }
  sidebarToggle() {
    this.isOpen = !this.isOpen;
    this.FormIsOpen = false ;
  }

  FormToggle() {
    this.FormIsOpen = !this.FormIsOpen;
  }

  GetUsers(): void {
    this.authService.getUser()?.subscribe((data) => {
      this.AdminsList = data;
    });
    // this.SubScriptionArray.push(UsersObserver);
  }
}
