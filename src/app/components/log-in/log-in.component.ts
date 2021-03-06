import { AdminAuthService } from '../../services/auth/adminAuth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  LoginForm: FormGroup;
  ErrorMessage: string = '';
  ErrorShow: boolean = false;

  constructor(
    private FormBuild: FormBuilder,
    private AdminAuth: AdminAuthService,
    private Route: Router
  ) {
    this.LoginForm = FormBuild.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }
  get Email() {
    return this.LoginForm.get('email');
  }

  get Password() {
    return this.LoginForm.get('password');
  }

  SubmitForm() {
    this.AdminAuth.Login(this.Email?.value, this.Password?.value)
      .then(() => {
        this.AdminAuth.AdminIsLogin.subscribe((user) => {
          if (user) {
            localStorage.setItem("adminUid", user?.uid);
          }
        })

        this.Route.navigate(['/Home/dashboard']);
        this.ErrorShow = false;
      })
      .catch((err) => {
        this.ErrorMessage = err;
        setTimeout(() => {
          this.ErrorShow = true;
        }, 1000);
        setTimeout(() => {
          this.ErrorShow = false;
        }, 5000);
      });
  }
}
