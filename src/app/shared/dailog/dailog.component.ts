import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/companyUser/company.service';
@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.scss'],
})
export class DailogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {}
  Delete() {
    this.companyService
      .deleteuser(this.data.id)
      .then(() => {})
      .catch((err) => console.log(err));
  }
}
