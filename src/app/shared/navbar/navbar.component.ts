import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Location } from '@angular/common';
import { ROUTES } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { AdminAuthService } from 'src/app/services/auth/adminAuth.service';
import { CompanyService } from 'src/app/services/companyUser/company.service';
import { ModelExitComponent } from '../model-exit/model-exit.component';
import { MatDialog } from '@angular/material/dialog';
import { Iadmin } from 'src/app/model/iadmin';

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
  faSignOut = faSignOut;
  AdminsList: Iadmin = {} as Iadmin;

  @ViewChild('app-navbar', { static: false }) button: any;
  @Output() toggleSide: EventEmitter<string> = new EventEmitter();

  constructor(
    private location: Location,
    private element: ElementRef,
    private router: Router,
    private companyService: CompanyService,
    private authService: AdminAuthService,
    private dialog: MatDialog
  ) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.authService.getUser()?.subscribe((data) => {
      this.AdminsList = data;
    });
  }

  toggleSideBar() {
    this.toggleSide.emit();
  }

  Logout() {
    const ref = this.dialog.open(ModelExitComponent);
  }
}
