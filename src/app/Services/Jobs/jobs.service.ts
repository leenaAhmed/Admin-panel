import { IJob } from 'src/app/Models/ijob';
import { IuserCompany } from '../../model/iuser-company';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class JobsService {
  CompanyList: IuserCompany[] = [];
  JobsList: IJob[] = [];
  AllJobsList: IJob[] = [];
  JobCount: number = 0;

  constructor(private FireBase: AngularFirestore) {}

  GetAllJobs(CompanyId: string) {
    return this.FireBase.collection(
      `company/${CompanyId}/jobs`
    ).snapshotChanges();
  }

  DeleteJob(JobId: string, CompanyId: string) {
    
    return this.FireBase.doc(`company/${CompanyId}/jobs/${JobId}`).delete();
  }

  UpdateStatus(JobId: string, NewStatus: string, CompanyId: string) {
    return this.FireBase.doc(`company/${CompanyId}/jobs/${JobId}`).update({
      status: NewStatus,
    });
  }

  GetTotalJobsNumber() {
    return this.FireBase.collectionGroup('jobs').snapshotChanges();
  }
  GetTotalJobApplication() {
    return this.FireBase.collectionGroup('jobApplication').snapshotChanges();
  }

  GetJobs() {
    return this.FireBase.collectionGroup('jobs').snapshotChanges();
  }

}
