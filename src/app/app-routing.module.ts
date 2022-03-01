import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyContactsComponent } from './components/company-contacts/company-contacts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { AdminIsLoginGuard } from './Guards/admin-is-login.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
// canActivate: [AdminIsLoginGuard],
const routes: Routes = [
  { path: '', pathMatch: 'full', component: LogInComponent },
  {
    path: 'Home',
    component: MainLayoutComponent,
    
    children: [
      { path: 'admin', component: CompanyContactsComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'usertable', component: UserTableComponent },
      { path: 'addadmin', component: AddAdminComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
