import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Location } from '@angular/common';
import { ROUTES } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/companyUser/company.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private listTitles: any[] = [];
  private nativeElement: Node;
  private toggleButton: any;
  private sidebarVisible: boolean;
  isOpen: boolean = false;
  isCollapsed: boolean = false;
  searchText!: string;

  @ViewChild('app-navbar', { static: false }) button: any;

  constructor(
    private location: Location,
    private element: ElementRef,
    private router: Router,
    private companyService: CompanyService
  ) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
    });
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    console.log(titlee);
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
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    console.log(toggleButton);
    const html = document.getElementsByTagName('html')[0];
    const navigation = <HTMLElement>document.getElementById('navigation');

    console.log(navigation);
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName('main-panel')[0]
    );
    console.log(mainPanel);
    setTimeout(function () {
      toggleButton.classList.add('toggled');
      navigation.classList.add('sidebarToggle');
    }, 100);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    const navigation = <HTMLElement>document.getElementById('navigation');
    console.log(navigation);
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName('main-panel')[0]
    );
    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 100);
    }
    this.toggleButton.classList.remove('toggled');
    navigation.classList.remove('sidebarToggle');

    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }
  collapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  search(event: any) {
    this.searchText = (event.target as HTMLInputElement).value;
    console.log(this.searchText);
    this.companyService.search.next(this.searchText);
  }
}
