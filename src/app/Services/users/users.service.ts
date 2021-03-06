import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: "root"
})
export class UsersService {
  Users: [] = [];
  constructor(private FireBase: AngularFirestore) {}

  GetAllUsers() {
    return this.FireBase.collection("users").snapshotChanges();
  }
  Deleteuser(id: string) {
    return this.FireBase.collection('users').doc(id).delete();
  }
}
