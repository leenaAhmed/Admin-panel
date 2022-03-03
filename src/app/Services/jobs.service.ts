import { IJob } from "src/app/Models/ijob";
import { IuserCompany } from "./../model/iuser-company";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { CompanyService } from "./companyUser/company.service";

@Injectable({
  providedIn: "root"
})
export class JobsService {
  CompanyList: IuserCompany[] = [];
  JobsList: IJob[] = [];
  AllJobsList: IJob[] = [];
  JobCount: number = 0;

  constructor(
    private FireBase: AngularFirestore,
    private CompanyServ: CompanyService,
  ) {}

  GetAllJobs(CompanyId: string) {
    return this.FireBase
      .collection(`company/${CompanyId}/jobs`)
      .snapshotChanges();
  }

  DeleteJob(JobId: string, CompanyId: string) {
    return this.FireBase.doc(`company/${CompanyId}/jobs/${JobId}`).delete();
  }

  UpdateStatus(JobId: string, NewStatus: string, CompanyId: string) {
    return this.FireBase.doc(`company/${CompanyId}/jobs/${JobId}`).update({
      status: NewStatus
    });
  }

  GetTotalJobsNumber() {
    return this.FireBase.collectionGroup('jobs').snapshotChanges();
  }
  GetTotalJobApplicationNumber() {
    return this.FireBase.collectionGroup('applicants').snapshotChanges();
  }

  GetAcceptedJobs()
  {
    return this.FireBase.collectionGroup('jobs').snapshotChanges();
  }
}
