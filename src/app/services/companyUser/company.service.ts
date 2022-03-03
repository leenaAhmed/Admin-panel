import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IuserCompany } from 'src/app/model/iuser-company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  public search = new BehaviorSubject<string>('');

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getCompanyUsers() {
    return this.firestore.collection('company').snapshotChanges();
  }
  getcompanyIndustry() {
    return this.firestore.collection('companyIndustry').valueChanges();
  }
  getcompanySize() {
    return this.firestore.collection('companySize').valueChanges();
  }
  deleteuser(id: string) {
    return this.firestore.collection('company').doc(id).delete();
  }
  creatUser(id: string | undefined, ImageFile: File, user: IuserCompany) {
    let ImagePath = this.storage.ref(`company/${ImageFile.name}`);
    return new Promise<void>((resolve, reject) => {
      ImagePath.put(ImageFile).then(() => {
        ImagePath.getDownloadURL().subscribe((logo) => {
          this.firestore
            .doc(`company/${id}`)
            .set({
              ...user,
              logo,
            })
            .then(() => resolve());
        });
      });
    });
  }
}
