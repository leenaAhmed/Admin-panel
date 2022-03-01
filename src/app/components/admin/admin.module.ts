import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  { path: 'user/editProfile', redirectTo: '/', pathMatch: 'full' },
  { path: 'editProfile', component: EditProfileComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  declarations: [ProfileComponent, EditProfileComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FontAwesomeModule,
    RouterModule.forChild(routes),
  ],
})
export class AdminModule {}
