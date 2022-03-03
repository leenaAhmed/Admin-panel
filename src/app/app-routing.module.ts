import { JobsPageComponent } from "./components/jobs-page/jobs-page.component";
import { AddAdminComponent } from "./components/add-admin/add-admin.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompanyContactsComponent } from "./components/company-contacts/company-contacts.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LogInComponent } from "./components/log-in/log-in.component";
import { UserTableComponent } from "./components/user-table/user-table.component";
import { AdminIsLoginGuard } from "./Guards/admin-is-login.guard";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";
import { JobsTableComponent } from "./components/jobs-table/jobs-table.component";
import { PendingJobsComponent } from "./components/pending-jobs/pending-jobs.component";
// canActivate: [AdminIsLoginGuard],
const routes: Routes = [
  { path: "", pathMatch: "full", component: LogInComponent },
  {
    path: "Home",
    component: MainLayoutComponent,

    children: [
      { path: "admin", component: CompanyContactsComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "usertable", component: UserTableComponent },
      { path: "addadmin", component: AddAdminComponent },
      {
        path: "jobpage",
        component: JobsPageComponent,
        children: [
          {path: '', redirectTo :'/Home/jobpage/jobtable', pathMatch: 'full'},
          { path: "jobtable", component: JobsTableComponent },
          { path: "pendingjobtable", component:PendingJobsComponent  }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
