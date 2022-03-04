import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/Services/auth/adminAuth.service';

@Component({
  selector: 'app-model-exit',
  templateUrl: './model-exit.component.html',
  styleUrls: ['./model-exit.component.scss'],
})
export class ModelExitComponent implements OnInit {
  constructor(private AdminAuth: AdminAuthService, private router: Router) {}

  ngOnInit(): void {}
  logout() {
    this.AdminAuth.Logout().then(() => this.router.navigate(['']));
  }
}
