import { Component, OnInit } from '@angular/core';
import { IJob } from 'src/app/Models/ijob';
import {
  faTrash,
  faSearch,
  faCheck,
  faClose,
} from '@fortawesome/free-solid-svg-icons';
import { JobsService } from 'src/app/services/Jobs/jobs.service';
import { Subscription } from 'rxjs';
import { CompanyJobsService } from 'src/app/services/Jobs/company-jobs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-jobs',
  templateUrl: './pending-jobs.component.html',
  styleUrls: ['./pending-jobs.component.scss'],
})
export class PendingJobsComponent implements OnInit {
  searchText: string = '';
  faCheck = faCheck;
  faClose = faClose;
  faSearch = faSearch;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  JobsList: IJob[] = [];
  PendingJobsList: IJob[] = [];
  Message: string = '';
  MessageShow: boolean = false;
  PendingMessage: string = '';
  SubScriptionArray: Subscription[] = [];
  CompanyId: string = '';
  UpdatedJobId: string = '';
  NewStatus: string = '';

  constructor(
    private JobsServ: JobsService,
    private CompanyIdServ: CompanyJobsService,
    private Route: Router
  ) {}

  ngOnInit(): void {
    this.CompanyId = this.CompanyIdServ.CompanyId;
    this.GetJobs(this.CompanyId);
    // this.GetPendingJobs()
  }

  ngOnDestroy(): void {
    for (let SubScripe of this.SubScriptionArray) {
      SubScripe.unsubscribe();
    }
  }

  GetJobs(Id: string): void {
    let JobObserver = this.JobsServ.GetAllJobs(Id).subscribe((data: any) => {
      this.JobsList = data.map((job: any) => {
        return {
          id: job.payload.doc.id,
          ...job.payload.doc.data(),
        };
      });
      for (let i = 0; i < this.JobsList.length; i++) {
        if (this.JobsList[i].status == 'PENDING') {
          this.PendingJobsList.push(this.JobsList[i]);
          this.count++;
        }
      }
    });

    console.log(this.PendingJobsList.length);
    this.SubScriptionArray.push(JobObserver);
  }

  //   GetPendingJobs()
  //   {
  //     let JobObserver = this.JobsServ.GetAcceptedJobs().subscribe((data: any) => {
  //       this.JobsList = data.map((job: any) => {
  //         return {
  //           id: job.payload.doc.id,
  //           ...job.payload.doc.data()
  //         };
  //       }); this.count = this.JobsList.length;
  //       console.log(this.JobsList)
  //   });
  //   this.SubScriptionArray.push(JobObserver);
  // }

  // openDialog(id: string) {
  //   const dialogRef = this.dialog.open(DailogComponent, {
  //     data: { id: id },
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  UpdateStatus(JobId: string) {
    this.JobsServ.UpdateStatus(JobId, this.NewStatus, this.CompanyId)
      .then(() => {
        this.Message = 'The status updated successfully!';
        setTimeout(() => {
          this.MessageShow = true;
        }, 1000);
        setTimeout(() => {
          this.MessageShow = false;
          this.Route.navigate(['/Home/jobpage/jobtable']);
        }, 3000);
      })
      .catch((err) => (this.Message = 'Error ! '));
  }
}
