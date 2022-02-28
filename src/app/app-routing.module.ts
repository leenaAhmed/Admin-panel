import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyContactsComponent } from './components/company-contacts/company-contacts.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: 'admin', component: CompanyContactsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
