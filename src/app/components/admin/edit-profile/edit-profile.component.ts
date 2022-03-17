import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminAuthService } from 'src/app/services/auth/adminAuth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Iadmin } from 'src/app/model/iadmin';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  user: any;

  isEditable = false;
  step: any = 1;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private authService: AdminAuthService,
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.authService.getUser()?.subscribe((data) => {
      this.user = data;
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
  uploadFile(event: any) {
    this.authService.uploadImage(event.target.files[0]);
  }
  saveProfile() {}

  updateName(name: string) {
    this.authService
      .updateUserName(name)
      .then(() => {
        this.snackBar.open('username updated  sucessfuly', 'x', {
          duration: 3000,
        });
      })
      .catch((err) => {
        this.snackBar.open(err.message, 'x', {
          duration: 3000,
        });
      });
  }
  updateEmail(email: string) {
    console.log('update email', email);
    this.authService.updateUserEmail(email).then(() => {
      this.snackBar.open('email updated  sucessfuly', 'x', {
        duration: 3000,
      });
    });
  }
}
