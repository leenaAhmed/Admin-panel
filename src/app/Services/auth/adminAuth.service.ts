import { first, map, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Iadmin } from 'src/app/model/iadmin';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  AdminIsLogin: Observable<firebase.User | null>;
  email: any;
  userId: any;
  private newuser = firebase.auth().currentUser;

  private user: Observable<any> | null = null;

  constructor(
    private FireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.AdminIsLogin = FireAuth.user;
    this.AdminIsLogin.subscribe((data) => {
      this.userId = data?.uid;
      console.log(this.userId);
    });
    this.FireAuth.onAuthStateChanged(async (user) => {
      if (user) {
        this.user = await this.firestore
          .doc<any>(`admin/${user.uid}`)
          .snapshotChanges()
          .pipe(
            map(function (actions) {
              const id = actions.payload.id;
              const data = actions.payload.data();
              return { id, ...data };
            })
          );
      } else {
        this.user = null;
      }
    });
  }
  getUser() {
    return this.user;
  }

  Login(Email: string, Password: string) {
    return this.FireAuth.signInWithEmailAndPassword(Email, Password);
  }

  Logout() {
    return this.FireAuth.signOut();
  }

  updateUserName(name: string) {
    return this.firestore.doc<Iadmin>(`admin/${this.userId}`).update({ name });
  }
  // updateUserEmail(email: string) {
  //   return
  // }
  updateUserEmail(email: any) {
    return this.email?.updateEmail(email).then(() => {
      this.firestore.doc<any>(`admin/${this.userId}`).update({ email });
    });

    // this.user.updateEmail(this.email)
    //   .then(() => {
    //     this.email = '';
    //      this.error = '';
    //   })
    //   .catch(err => {
    //     console.log(` failed ${err}`);
    //     this.error = err.message;
    //   });
  }
  uploadImage(image: File) {
    return new Promise((resolve, reject) => {
      let ref = this.storage.ref(`AdmineProfileImage/${image.name}`);
      ref.put(image).then(() => {
        ref.getDownloadURL().subscribe((imageURL) => {
          this.firestore
            .doc<any>(`admin/${this.userId}`)
            .update({ imageURL })
            .then(() => {
              resolve('add');
            });
        });
      });
    });
  }
  updateEmail(newEmail: string, password: string) {}
}
