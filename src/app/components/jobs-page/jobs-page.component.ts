import { Component, OnInit } from '@angular/core';
import { IuserCompany } from 'src/app/model/iuser-company';
import { CompanyService } from 'src/app/Services/companyUser/company.service';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CompanyJobsService } from 'src/app/Services/Jobs/company-jobs.service';

@Component({
  selector: 'app-jobs-page',
  templateUrl: './jobs-page.component.html',
  styleUrls: ['./jobs-page.component.scss'],
})
export class JobsPageComponent implements OnInit {
  CompanyList: IuserCompany[] = [];
  searchText: string = '';
  faPlus = faPlus;
  faSearch = faSearch;
  pageC: number = 1;
  countC: number = 0;
  tableSizeC: number = 5;
  CompanyId: string = '';
  Clicked: boolean = false;
  timeout: boolean = true;
  constructor(
    private CompanyService: CompanyService,
    private CompanyIdServ: CompanyJobsService
  ) {}

  ngOnInit(): void {
    this.GetCompanies();
  }
  GetCompanies(): void {
    this.CompanyService.getCompanyUsers().subscribe((data: any) => {
      this.CompanyList = data.map((ele: any) => {
        return {
          id: ele.payload.doc.id,
          ...ele.payload.doc.data(),
        };
      });
    });
  }

  SendCompanyId(Id: string) {
    setTimeout(() => {
      this.timeout = false;
    }, 1000);
    this.CompanyIdServ.CompanyId = Id;
    this.Clicked = true;
  }
}
