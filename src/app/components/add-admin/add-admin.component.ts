import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/Services/auth/adminAuth.service';
import { AdminService } from 'src/app/Services/Admin/admin.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
  AddAdminForm: FormGroup;
  ErrorMessage: string = '';
  ErrorShow: boolean = false;
  SuccessAddShow: boolean = false;
  @ViewChild('AdminImage') AdminImage!: ElementRef;

  constructor(
    private FormBuild: FormBuilder,
    private AdminAuth: AdminAuthService,
    private AdminServ: AdminService,
    private Route: Router
  ) {
    this.AddAdminForm = FormBuild.group(
      {
        name: [
          '',
          [Validators.required, Validators.pattern('[A-Za-z0-9 /s]{5,}')],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-zA-Z0-9]{4,}(@)[a-zA-Z0-9]{3,}(?!s)(.com)'),
          ],
        ],
        password: [
          '',
          [Validators.required, Validators.pattern('[a-z0-9A-Z]{6,}')],
        ],
        confirmPassword: [
          '',
          [Validators.required, Validators.pattern('[a-z0-9A-Z]{6,}')],
        ],
        imageURL: ['', [Validators.required]],
      },
      { validators: this.PasswordMatch }
    );
  }

  ngOnInit(): void {}
  get Email() {
    return this.AddAdminForm.get('email');
  }

  get Password() {
    return this.AddAdminForm.get('password');
  }

  get ConfirmPassword() {
    return this.AddAdminForm.get('confirmPassword');
  }

  get Name() {
    return this.AddAdminForm.get('name');
  }

  get ImageURL() {
    return this.AddAdminForm.get('imageURL');
  }

  SubmitForm() {
    let ProfileImageURL = (<HTMLInputElement>this.AdminImage.nativeElement)
      .files![0];
    this.AdminAuth.SignUp(this.Email?.value, this.Password?.value)
      .then((data) => {
        this.AdminServ.AddAdmin(
          data.user?.uid,
          this.Email?.value,
          this.Name?.value,
          ProfileImageURL
        ).then(() => {
          this.ErrorShow = false;
          setTimeout(() => {
            this.SuccessAddShow = true;
          }, 1000);
          setTimeout(() => {
            this.SuccessAddShow = false;
            this.Route.navigate(['/Home/dashboard']);
          }, 5000);
        });
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
  PasswordMatch: ValidatorFn = (
    frmGroup: AbstractControl
  ): ValidationErrors | null => {
    let PassControl = frmGroup.get('password');
    let ConfirmPassControl = frmGroup.get('confirmPassword');
    if (
      !PassControl ||
      !ConfirmPassControl ||
      !PassControl.value ||
      !ConfirmPassControl.value
    )
      return null;

    let valErr = {
      UnmatchedPassword: {
        pass: PassControl?.value,
        confrim: ConfirmPassControl?.value,
      },
    };
    return PassControl?.value == ConfirmPassControl?.value ? null : valErr;
  };
}
