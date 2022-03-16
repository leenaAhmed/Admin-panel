import { JobsPageComponent } from './components/jobs-page/jobs-page.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyContactsComponent } from './components/company-contacts/company-contacts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { AdminIsLoginGuard } from './Guards/admin-is-login.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { JobsTableComponent } from './components/jobs-table/jobs-table.component';
import { PendingJobsComponent } from './components/pending-jobs/pending-jobs.component';
import { AdminModule } from './components/admin/admin.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { JobApplicationComponent } from './components/job-application/job-application.component';
import { SingleCompanyComponent } from './components/single-company/single-company.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LogInComponent },
  {
    path: 'Home',
    component: MainLayoutComponent,
    canActivate: [AdminIsLoginGuard],
    children: [
      { path: 'admin', component: CompanyContactsComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'usertable', component: UserTableComponent },
      { path: 'addadmin', component: AddAdminComponent },
      { path: 'admin/company/:companyId', component: SingleCompanyComponent },
      {
        path: 'jobapplicationstable',
        component: JobApplicationComponent,
      },
      {
        path: 'user',
        loadChildren: () =>
          import('src/app/components/admin/admin.module').then(
            (m) => m.AdminModule
          ),
      },
      {
        path: 'jobpage',
        component: JobsPageComponent,
        children: [
          { path: '', redirectTo: '/Home/jobpage/spinner', pathMatch: 'full' },
          {
            path: 'spinner',
            component: SpinnerComponent,
          },
          { path: 'jobtable', component: JobsTableComponent },
          { path: 'pendingjobtable', component: PendingJobsComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
