import { AngularFireStorage } from "@angular/fire/storage";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor(
    private FireBase: AngularFirestore,
    private FirebaseStorage: AngularFireStorage
  ) {}
  GetAllAdmins() {
    return this.FireBase.collection("admin").snapshotChanges();
  }

  AddAdmin(
    Id: string | undefined,
    Email: string,
    Name: string,
    ImageFile: File
  ) {
    let ImagePath = this.FirebaseStorage.ref(
      `AdmineProfileImage/${ImageFile.name}`
    );
    return new Promise<void>((resolve,reject)=>
    {
      ImagePath.put(ImageFile).then(() => {
        ImagePath.getDownloadURL().subscribe(ImageURL => {
           this.FireBase.doc(`admin/${Id}`).set({
            email: Email,
            name: Name,
            imageURL: ImageURL
          }).then(()=>resolve())
        });
      });
    })
  }
}
