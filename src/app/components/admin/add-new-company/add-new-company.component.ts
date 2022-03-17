import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { mustMatch } from 'src/app/custom/password';
import { AdminAuthService } from 'src/app/services/auth/adminAuth.service';
import { IuserCompany } from 'src/app/model/iuser-company';
import { CompanyService } from 'src/app/services/companyUser/company.service';
interface CompanySize {
  size: string;
}
interface CompanyIndustry {
  id: string;
  name: string;
}
@Component({
  selector: 'app-add-new-company',
  templateUrl: './add-new-company.component.html',
  styleUrls: ['./add-new-company.component.scss'],
})
export class AddNewCompanyComponent implements OnInit {
  @ViewChild('logo') logo!: ElementRef;
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  @ViewChild('Image') Image!: ElementRef;
  companysize: CompanySize[] = [];
  formValue: FormGroup;
  errorMessage: string = '';

  loading = false;
  submitted = false;
  companyIndustry: CompanyIndustry[] = [];
  companyCountes = [
    { value: 'Egypt' },
    { value: 'Saudi Arabia ' },
    { value: 'United Arab Emirates' },
    { value: 'Sudan' },
    { value: 'Other' },
  ];
  selected: any[] = [];
  step: any = 1;
  hide = true;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AdminAuthService,
    private companyService: CompanyService,
    private snackBar: MatSnackBar
  ) {
    this.formValue = formBuilder.group(
      {
        fristName: [
          '',
          [Validators.required, Validators.pattern('[A-Za-z]{3,}')],
        ],
        lastName: [
          '',
          [Validators.required, Validators.pattern('[A-Za-z]{3,}')],
        ],

        companyEmail: [
          '',
          [Validators.required, Validators.pattern(this.emailPattern)],
        ],
        companyIndustry: ['', Validators.required],
        empTitle: [null, Validators.required],
        companyName: [null, Validators.required],
        companySize: [null, Validators.required],
        aboutCompany: [null, Validators.required],
        companyCountry: [null, Validators.required],
        logo: ['', Validators.required],
        password: [
          null,
          [Validators.required, Validators.pattern('[a-z0-9A-Z]{6,}')],
        ],
        confirmPassword: ['', Validators.required],

        image: ['', Validators.required],
      },
      { validators: mustMatch }
    );
  }

  ngOnInit(): void {
    this.companyService.getcompanyIndustry().subscribe((industry: any) => {
      this.companyIndustry = industry.map((item: any) => {
        console.log(item.payload.doc.data());
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data(),
        };
      });
    });
    this.companyService.getcompanySize().subscribe((sizes: any) => {
      this.companysize = sizes.map((size: any) => {
        console.log(size.payload.doc.data());
        return {
          id: size.payload.doc.id,
          ...size.payload.doc.data(),
        };
      });
    });
  }

  onSubmit() {
    let userModel: IuserCompany = this.formValue.value as IuserCompany;
    const companyModel: IuserCompany = {
      companyName: this.formValue.value.companyName,
      companyEmail: this.formValue.value.companyEmail,
      companySize: this.formValue.value.companySize,
      companyIndustry: this.formValue.value.companyIndustry,
      aboutCompany: this.formValue.value.aboutCompany,
      companyCountry: this.formValue.value.companyCountry,
      fristName: this.formValue.value.fristName,
      lastName: this.formValue.value.lastName,

      mobileNo: '',
      empTitle: '',
    };
    let logo = this.Image.nativeElement.files[0];
    this.authService
      .SignUp(this.companyEmail?.value, this.password?.value)
      .then((data) => {
        this.companyService
          .creatUser(data.user?.uid, logo, companyModel)
          .then(() => {
            this.snackBar.open('Signed up sucessfuly', 'x', {
              duration: 3000,
            });
            this.router.navigate(['/Home/admin']);
          })
          .catch((error) => {
            this.snackBar.open(error.message, 'x', {
              duration: 3000,
            });
          });
      })
      .catch((error) => {
        this.errorMessage = error;
      });

    console.log('userModel', this.formValue.value);
  }

  get fristName() {
    return this.formValue.get('fristName');
  }
  get picture() {
    return this.formValue.get('logo');
  }
  get lastName() {
    return this.formValue.get('lastName');
  }
  get companyEmail() {
    return this.formValue.get('companyEmail');
  }

  get industry() {
    return this.formValue.get('companyIndustry');
  }
  get empTitle() {
    return this.formValue.get('empTitle');
  }
  get companyName() {
    return this.formValue.get('companyName');
  }
  get companyCountry() {
    return this.formValue.get('companyCountry');
  }
  get aboutcompany() {
    return this.formValue.get('aboutCompany');
  }
  get password() {
    return this.formValue.get('password');
  }
  get confirmPassword() {
    return this.formValue.get('confirmPassword');
  }
  get companySize() {
    return this.formValue.get('companySize');
  }
  previousStep() {
    this.step = this.step - 1;
  }
  NextStep() {
    this.step = this.step + 1;
  }
}
