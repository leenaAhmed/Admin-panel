import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CompanyJobsService } from 'src/app/services/Jobs/company-jobs.service';
import { JobsService } from 'src/app/services/Jobs/jobs.service';
@Component({
  selector: 'app-jobmodel',
  templateUrl: './jobmodel.component.html',
  styleUrls: ['./jobmodel.component.scss'],
})
export class JobmodelComponent implements OnInit {
  constructor(
    private JobsServ: JobsService,
    private CompanyIdServ: CompanyJobsService,
    private Route: Router
  ) {}

  ngOnInit(): void {}
  // UpdateStatus(JobId: string) {
  //   this.JobsServ.UpdateStatus()
  //     .then(() => {
  //       this.Message = 'The status updated successfully!';
  //       setTimeout(() => {
  //         this.MessageShow = true;
  //       }, 1000);
  //       setTimeout(() => {
  //         this.MessageShow = false;
  //         this.Route.navigate(['/Home/jobpage/jobtable']);
  //       }, 3000);
  //     })
  //     .catch((err) => (this.Message = 'Error ! '));
  // }
}
