import { IJob } from 'src/app/Models/ijob';
import { IUser } from './../../Models/iuser';
import { UsersService } from 'src/app/services/users/users.service';
import { Component, OnInit } from '@angular/core';
import {
  faUser,
  faBuilding,
  faBriefcase,
  faPaperclip,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyService } from 'src/app/services/companyUser/company.service';
import { IuserCompany } from 'src/app/model/iuser-company';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  faUser = faUser;
  faBuilding = faBuilding;
  faBriefcase = faBriefcase;
  faArrowAltCircleRight = faArrowAltCircleRight;
  faPaperclip = faPaperclip;
  TotalUsers: number = 0;
  TotalCompanies: number = 0;
  TotalJobs: number = 0;
  TotalJobAppliction: number = 0;
  UsersList: IUser[] = [];
  CompanyList: IuserCompany[] = [];
  JobsList: IJob[] = [];
  JobAppList: IJob[] = [];
  SubScriptionArray: Subscription[] = [];

  constructor(
    private UserService: UsersService,
    private JobsServ: JobsService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.GetTotalUsers();
    this.GetTotalCompanies();
    this.GetTotalJobs();
    this.GetTotalJobApplication();
  }
  ngOnDestroy(): void {
    for (let SubScripe of this.SubScriptionArray) {
      SubScripe.unsubscribe();
    }
  }
  GetTotalUsers(): void {
    let UsersObserver = this.UserService.GetAllUsers().subscribe(
      (data: any) => {
        data.map((user: any) => {
          this.UsersList.push(user);
        });
        this.TotalUsers = this.UsersList.length;
      }
    );

    this.SubScriptionArray.push(UsersObserver);
  }

  GetTotalCompanies(): void {
    let CompanyObserver = this.companyService
      .getCompanyUsers()
      .subscribe((data: any) => {
        data.map((company: any) => {
          this.CompanyList.push(company);
        });
        this.TotalCompanies = this.CompanyList.length;
      });
    this.SubScriptionArray.push(CompanyObserver);
  }

  GetTotalJobs(): void {
    let JobObserval = this.JobsServ.GetTotalJobsNumber().subscribe(
      (data: any) => {
        data.map((Job: any) => {
          console.log(Job.payload.doc.id);
          this.JobsList.push(Job);
        });
        this.TotalJobs = this.JobsList.length;
        // console.log()
      }
    );
    this.SubScriptionArray.push(JobObserval);
  }

  GetTotalJobApplication() {
    let JobApplicationObserval =
      this.JobsServ.GetTotalJobApplicationNumber().subscribe((data: any) => {
        data.map((JobApp: any) => {
          this.JobAppList.push(JobApp);
        });
        this.TotalJobAppliction = this.JobAppList.length;
      });
    this.SubScriptionArray.push(JobApplicationObserval);
  }
}
