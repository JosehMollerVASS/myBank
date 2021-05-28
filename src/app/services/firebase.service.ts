import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { UtilsService } from './utils.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private conection: any; 
  private db: any; 
  constructor(private googlePlus: GooglePlus, public loadingController: LoadingController,
              private utilsService: UtilsService, private router: Router,) { 
    this.conection = firebase.auth();
    this.db = firebase.firestore();
  }
  picture: any;
  name: any;
  email: any;
  usuario: any;
  async loginGoogleAndroid() {
    console.log("servicio")
    const res = await this.googlePlus.login({
      'webClientId': "330275154626-8fpnjpkhl3hstpu24r17b0nrp0he48tp.apps.googleusercontent.com",
      'offline': true
    });
    const resConfirmed = await this.conection.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
    const user = resConfirmed.user;
    this.picture = user.photoURL;
    this.name = user.displayName;
    this.email = user.email;
    if (user) {
      
    }
  }

  async loginGoogleWeb() {
    const res = await this.conection.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const user = res.user;
    console.log(user);
    this.picture = user.photoURL;
    this.name = user.displayName;
    this.email = user.email;
  }
  

  async getDataUsuario(documento: string, password: string){
    const loading = await this.loadingController.create({
      message: "Validando datos..."
    });
    await loading.present();   
    let citiesRef = this.db.collection('usuarios');
    let query = citiesRef.where('documento', '==', documento).where('password', '==', password).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents. DOBLE');
          let cabeza = "Hubo un error";
          let mensaje = "Verifica tu usuario y contraseña";
          loading.dismiss();
          this.utilsService.Alert(cabeza, mensaje);             
        }
        snapshot.forEach(doc => {
          //EJECUTAR POR COLECCION                    
            this.usuario = doc.data();   
            //let us = ({correo: this.usuario[0].correo, role: this.usuario[0].role.replace(/["']/g, ""), nombres: this.usuario[0].nombres});            
            this.router.navigate(['/inicio', JSON.stringify(doc.data())]);
              //this.router.navigate(['/inicio', JSON.stringify(us) ]);

          loading.dismiss(); 
        });
      })
      .catch(err => {
        loading.dismiss();
        console.log('Error getting documents', err);
      });
  }

}
