import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  AdminIsLogin : Observable<firebase.User | null> ;
  constructor(private FireAuth : AngularFireAuth) { 
    this.AdminIsLogin = FireAuth.user ;
  }

  Login(Email:string , Password:string)
  {
    return this.FireAuth.signInWithEmailAndPassword(Email, Password);
  }

  Logout()
  {
    return this.FireAuth.signOut();
  }
}
