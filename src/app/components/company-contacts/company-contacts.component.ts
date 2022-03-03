import { Component, OnInit } from '@angular/core';
import { IuserCompany } from 'src/app/model/iuser-company';
import { CompanyService } from 'src/app/services/companyUser/company.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { DailogComponent } from 'src/app/shared/dailog/dailog.component';
import { MatDialog } from '@angular/material/dialog';
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
  faSearch = faSearch;

  constructor(
    private companyService: CompanyService,
    public dialog: MatDialog
  ) {
    console.log(this.companyUsers);
  }

  ngOnInit(): void {
    this.fetchPosts();
    console.log(this.searchText);
    console.log(this.companyUsers);
  }
  fetchPosts(): void {
    this.companyService.getCompanyUsers().subscribe((data: any) => {
      this.companyUsers = data.map((ele: any) => {
        console.log(ele.payload.doc.data());
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
  openDialog(id: string) {
    const dialogRef = this.dialog.open(DailogComponent, {
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  // search(event: any) {
  //   this.searchText = (event.target as HTMLInputElement).value;
  //   console.log(this.searchText);
  //   this.companyService.search.next(this.searchText);
  // }
}
