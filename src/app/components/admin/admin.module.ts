import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { AddNewCompanyComponent } from './add-new-company/add-new-company.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
  { path: 'user/editProfile', redirectTo: '/', pathMatch: 'full' },
  { path: 'editProfile', component: EditProfileComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'addcompany', component: AddNewCompanyComponent },
];

@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    AddNewCompanyComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    NgSelectModule,
    MatSelectModule,
    MatSnackBarModule,
    RouterModule.forChild(routes),
  ],
})
export class AdminModule {}
