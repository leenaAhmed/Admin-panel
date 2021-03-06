import { IJob } from './../../Models/ijob';
import {
  Component,
  OnInit,
  DoCheck,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { JobsService } from 'src/app/services/Jobs/jobs.service';
import { IuserCompany } from 'src/app/model/iuser-company';
// import { CompanyService } from 'src/app/services/companyUser/company.service';
import { Subscription } from 'rxjs';
import { CompanyJobsService } from 'src/app/services/Jobs/company-jobs.service';

@Component({
  selector: 'app-jobs-table',
  templateUrl: './jobs-table.component.html',
  styleUrls: ['./jobs-table.component.scss'],
})
export class JobsTableComponent implements OnInit, OnChanges {
  searchText: string = '';
  faTrash = faTrash;
  faSearch = faSearch;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  JobsList: IJob[] = [];
  AcceptedJobsList: IJob[] = [];
  DeleteJobId: string = '';
  CompanyId: string = '';
  MessageShow: boolean = false;
  DeleteMessage: string = '';
  SubScriptionArray: Subscription[] = [];
  timeout: boolean = false;
  constructor(
    private JobsServ: JobsService,
    private CompanyIdServ: CompanyJobsService
  ) {}
  ngOnChanges(changes: SimpleChanges) {
    console.log('change');
    // this.CompanyId = this.CompanyIdServ.CompanyId;
    // this.GetJobs(this.CompanyId);
  }

  ngOnInit(): void {
    this.CompanyId = this.CompanyIdServ.CompanyId;
    this.GetJobs(this.CompanyId);
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
          data: job.payload.doc.data()['date'],
          ...job.payload.doc.data(),
        };
      });
      for (let i = 0; i < this.JobsList.length; i++) {
        if (this.JobsList[i].status == 'ACCEPTED') {
          this.AcceptedJobsList.push(this.JobsList[i]);
          this.count++;
        }
      }
    });

    this.SubScriptionArray.push(JobObserver);
  }
  DeleteJob(JobId: string) {
    this.JobsServ.DeleteJob(JobId, this.CompanyId)
      .then(() => {
        this.DeleteMessage = 'The job delete successfully!';
        setTimeout(() => {
          this.MessageShow = true;
        }, 1000);
        setTimeout(() => {
          this.MessageShow = false;
        }, 3000);
      })
      .catch((err) => (this.DeleteMessage = 'Error !'));
  }
}
