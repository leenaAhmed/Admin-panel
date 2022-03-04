import { IUser } from "./../../Models/iuser";
import { IuserCompany } from "./../../model/iuser-company";
import { IJobApplication } from "./../../Models/ijob-application";
import { Component, OnInit } from "@angular/core";
import { IJob } from "./../../Models/ijob";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { JobsService } from "src/app/Services/Jobs/jobs.service";
import { Subscription } from "rxjs";
import { CompanyJobsService } from "src/app/Services/Jobs/company-jobs.service";
import { IJobApplicationNames } from "src/app/Models/ijob-application-names";
import { CompanyService } from "src/app/Services/companyUser/company.service";
import { UsersService } from "src/app/Services/users/users.service";

@Component({
  selector: "app-job-application",
  templateUrl: "./job-application.component.html",
  styleUrls: ["./job-application.component.scss"]
})
export class JobApplicationComponent implements OnInit {
  searchText: string = "";
  faSearch = faSearch;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  JobsAppList: IJobApplication[] = [];
  JobsList: IJob[] = [];
  CompanyList: IuserCompany[] = [];
  UserList: IUser[] = [];
  jobName: string = "";
  CompanyName: string = "";
  UserName: string = "";
  DeleteJobId: string = "";
  CompanyId: string = "";
  MessageShow: boolean = false;
  DeleteMessage: string = "";
  SubScriptionArray: Subscription[] = [];
  JobAppDetailsList: IJobApplicationNames[] = [];

  constructor(
    private JobsServ: JobsService,
    private CompanyServ: CompanyService,
    private UsersServ: UsersService
  ) {}

  ngOnInit(): void {
    this.GetJobApplications();
  }
  ngOnDestroy(): void {
    for (let SubScripe of this.SubScriptionArray) {
      SubScripe.unsubscribe();
    }
  }

  GetJobApplications(): void {
    let JobAppObserver = this.JobsServ
      .GetTotalJobApplication()
      .subscribe((data: any) => {
        this.JobsAppList = data.map((job: any) => {
          return {
            ...job.payload.doc.data()
          };
        });
        console.log(this.JobsAppList);
        this.count = this.JobsAppList.length;
        for (let i = 0; i < this.JobsAppList.length; i++) {
          this.JobsServ.GetJobs().subscribe((data: any) => {
            this.JobsList = data.map((job: any) => {
              return {
                id: job.payload.doc.id,
                ...job.payload.doc.data()
              };
            });
            console.log(this.JobsList);
            for (let j = 0; j < this.JobsList.length; j++) {
              console.log(this.JobsList[j].id == this.JobsAppList[i].jobId);
              if (this.JobsList[j].id == this.JobsAppList[i].jobId) {
                this.jobName = this.JobsList[j].jobTitle;
                this.JobAppDetailsList.push({
                  JobName: this.jobName,
                  CompanyName: this.CompanyName,
                  UserName: this.UserName
                });
              }
            }
          });
          this.CompanyServ.getCompanyUsers().subscribe((data: any) => {
            this.CompanyList = data.map((company: any) => {
              return {
                id: company.payload.doc.id,
                ...company.payload.doc.data()
              };
            });
            for (let j = 0; j < this.CompanyList.length; j++) {
              console.log(
                this.CompanyList[j].id == this.JobsAppList[i].companyId
              );
              if (this.CompanyList[j].id == this.JobsAppList[i].companyId) {
                this.CompanyName = this.CompanyList[j].companyName;
                this.JobAppDetailsList[i].CompanyName = this.CompanyName;
              }
            }
          });
          this.UsersServ.GetAllUsers().subscribe((data: any) => {
            this.UserList = data.map((user: any) => {
              return {
                id: user.payload.doc.id,
                ...user.payload.doc.data()
              };
            });
            for (let j = 0; j < this.UserList.length; j++) {
              if (this.UserList[j].id == this.JobsAppList[i].userId) {
                this.UserName = this.UserList[j].name;
                this.JobAppDetailsList[i].UserName = this.UserName;
              }
            }
          });
        }
      });

    this.SubScriptionArray.push(JobAppObserver);
  }
}
