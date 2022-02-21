import { Component, OnInit } from '@angular/core';
 
export const ROUTES: any[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/admin', title: 'Admin', icon: 'person', class: '' },
  {
    path: '/table-list',
    title: 'Table List',
    icon: 'content_paste',
    class: '',
  },
  {
    path: '/company',
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
  constructor() {}

  ngOnInit(): void {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
    sidebarToggle(){
     this.isOpen=!this.isOpen
  }
}
