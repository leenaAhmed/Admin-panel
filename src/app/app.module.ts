import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MatIconModule } from '@angular/material/icon';
import { CompanyContactsComponent } from './components/company-contacts/company-contacts.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { FilterPipe } from './pipe/filter.pipe';

import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { DailogComponent } from './shared/dailog/dailog.component';
import { JobsTableComponent } from './components/jobs-table/jobs-table.component';
import { JobsPageComponent } from './components/jobs-page/jobs-page.component';
import { PendingJobsComponent } from './components/pending-jobs/pending-jobs.component';
import { ConvertToDatePipe } from './pipe/convert-to-date.pipe';
import { JobApplicationComponent } from './components/job-application/job-application.component';
import { ModelExitComponent } from './shared/model-exit/model-exit.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    MainLayoutComponent,
    CompanyContactsComponent,
    FilterPipe,
    DashboardComponent,
    LogInComponent,
    AddAdminComponent,
    DailogComponent,
    JobsTableComponent,
    JobsPageComponent,
    PendingJobsComponent,
    ConvertToDatePipe,
    UserTableComponent,
    JobApplicationComponent,
    ModelExitComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    AngularFirestoreModule,
    FormsModule,
    FontAwesomeModule,
    MatDialogModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    NgxPaginationModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
