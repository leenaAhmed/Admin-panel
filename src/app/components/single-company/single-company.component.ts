import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IuserCompany } from 'src/app/model/iuser-company';
import { CompanyService } from 'src/app/services/companyUser/company.service';

@Component({
  selector: 'app-single-company',
  templateUrl: './single-company.component.html',
  styleUrls: ['./single-company.component.scss'],
})
export class SingleCompanyComponent implements OnInit {
  companyUsers: any = {} as IuserCompany;
  companyId: string | null = '';
  constructor(
    private companyService: CompanyService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    console.log('this.companyId');

    console.log(this.companyId);
  }

  ngOnInit(): void {
    console.log('this.companyId');

    this.activeRoute.paramMap.subscribe((paramMap) => {
      this.companyId = paramMap.get('companyId');
      console.log(this.companyId);
      this.companyService
        .getSingleCompany(this.companyId)
        .subscribe((company) => {
          this.companyUsers = company.payload.data();
          console.log(company.payload.data());

          return company.payload.data();
        });
    });
  }
}
