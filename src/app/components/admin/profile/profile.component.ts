import { Component, OnInit } from '@angular/core';
import { Iadmin } from 'src/app/model/iadmin';
import { AdminService } from 'src/app/Services/Admin/admin.service';
import { AdminAuthService } from '../../../Services/auth/adminAuth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // message: faEnvelope;
  loggedAdmin: Iadmin = {} as Iadmin;
  adminList: Iadmin[] = [];
  constructor(
    private admin: AdminService,
    private authService: AdminAuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUser()?.subscribe((data) => {
      this.loggedAdmin = data;
    });
    console.log(this.loggedAdmin);

    this.admin.GetAllAdmins().subscribe((data: any) => {
      console.log(data);
      this.adminList = data.map((user: any) => {
        console.log(user);
        return {
          id: user.payload.doc.id,
          ...user.payload.doc.data(),
        };
      });
    });

    // this.admin.getloggedin().subscribe((data: any) => {
    //   console.log(data);
    //   this.loggedAdmin = data;
    // });

    console.log(this.loggedAdmin);
  }
}
