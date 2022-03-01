import { Injectable } from '@angular/core';

import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Iadmin } from '../model/iadmin';
import { AdminAuthService } from './auth/adminAuth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  adminId: any = '';
  constructor(
    private FireBase: AngularFirestore,
    private authService: AdminAuthService,
    private Auth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {
    this.authService.AdminIsLogin.subscribe((data) => {
      this.adminId = data?.uid;
      console.log(this.adminId);
    });
  }
  GetAllAdmins() {
    return this.FireBase.collection('admin').snapshotChanges();
  }
  updateUser() {
    this.FireBase.collection('admin');
  }

  uploadImage(image: File) {
    return new Promise((resolve, reject) => {
      let ref = this.storage.ref(`AdmineProfileImage/${image.name}`);
      ref.put(image).then(() => {
        ref.getDownloadURL().subscribe((imageurl) => {
          this.FireBase.doc<any>(`admin/${this.adminId}`)
            .update({ imageurl })
            .then(() => {
              resolve('add');
            });
        });
      });
    });
  }
}
