import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private FireBase: AngularFirestore) { }
  GetAllAdmins() {
    return this.FireBase.collection("admin").snapshotChanges();
  }
}
