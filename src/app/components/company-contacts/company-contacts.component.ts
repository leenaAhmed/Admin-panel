import { Component, OnInit } from '@angular/core';
import { IuserCompany } from 'src/app/model/iuser-company';
import { CompanyService } from 'src/app/services/companyUser/company.service';
@Component({
  selector: 'app-company-contacts',
  templateUrl: './company-contacts.component.html',
  styleUrls: ['./company-contacts.component.scss'],
})
export class CompanyContactsComponent implements OnInit {
  companyUsers: IuserCompany[] = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  searchText: string = '';
  message = '';

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.fetchPosts();
    console.log(this.searchText);
  }
  fetchPosts(): void {
    this.companyService.getCompanyUsers().subscribe((data: any) => {
      this.companyUsers = data.map((ele: any) => {
        return {
          id: ele.payload.doc.id,
          ...ele.payload.doc.data(),
        };
      });
    });
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.fetchPosts();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchPosts();
  }
  deleteuser(id: string) {
    this.companyService
      .deleteuser(id)
      .then(() => {
        this.message = 'The user company  delete successfully!';
      })
      .catch((err) => console.log(err));
    console.log(id);
  }
  // search(event: any) {
  //   this.searchText = (event.target as HTMLInputElement).value;
  //   console.log(this.searchText);
  //   this.companyService.search.next(this.searchText);
  // }
}
