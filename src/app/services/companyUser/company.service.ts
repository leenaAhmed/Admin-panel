import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  public search = new BehaviorSubject<string>('');

  constructor(private firestore: AngularFirestore) {}

  getCompanyUsers() {
    return this.firestore.collection('company').snapshotChanges();
  }
  deleteuser(id: string) {
    return this.firestore.collection('company').doc(id).delete();
  }
}
