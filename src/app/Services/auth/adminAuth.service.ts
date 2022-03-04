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
  useremail: any;
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
      this.useremail = data;
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
  SignUp(Email: string, Password: string) {
    return this.FireAuth.createUserWithEmailAndPassword(Email, Password);
  }

  updateUserName(name: string) {
    return this.firestore.doc<Iadmin>(`admin/${this.userId}`).update({ name });
  }

  updateUserEmail(email: string) {
    console.log(`update servvice`, email);
    return this.useremail
      .updateEmail(email)
      .then(() => {
        this.firestore.doc<Iadmin>(`admin/${this.userId}`).update({ email });
      })
      .catch((err: any) => {
        console.log(` failed ${err}`);
      });
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
}
