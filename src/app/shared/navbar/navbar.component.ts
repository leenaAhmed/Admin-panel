import { Component, ElementRef, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ROUTES } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private listTitles: any[] = [];
   mobile_menu_visible: any = 0;
  isOpen: boolean = false;

  constructor( private location: Location , private element: ElementRef , private router : Router) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
  }
  sidebarToggle(){
     this.isOpen=!this.isOpen
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
}
