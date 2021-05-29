import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { UtilsService } from './utils.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private conection: any; 
  private db: any; 
  constructor(private googlePlus: GooglePlus, public loadingController: LoadingController,
              private utilsService: UtilsService, private router: Router, public alertCtrl: AlertController) { 
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
    console.log("servicio")
    let datos =[];
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
            this.usuario = doc.data();  
            var obj = doc.data();  
            obj.id = doc.id;
            datos.push(obj);                          
            this.router.navigate(['/inicio', JSON.stringify(datos)]);
          loading.dismiss(); 
        });
      })
      .catch(err => {
        loading.dismiss();
        console.log('Error getting documents', err);
      });
  }

  getDataUsusario(dni)  {          
    let posts = [];
    return new Observable(observer => {
      const unsubscribe = firebase.firestore().collection('usuarios').where('documento', '==', dni).onSnapshot(querySnapshot => {   
        posts = [];
       querySnapshot.forEach(function(doc) {
        
          posts.push(doc.data());
        });
  
          observer.next(posts);
        });
  
      return () => {
        unsubscribe();
      };
    });
    }

    async movimientoTarjeta(password, apellidos, jsonTarjetas, documento, nombres, jsoncredito, codId){  
      console.log("movimiento")          
    const loading = await this.loadingController.create({
      message: "Cargando Movimiento..."
    });
    await loading.present();  
      
           this.db.collection("usuarios").doc(codId).update({          
            password: password,
            apellidos: apellidos,
            tarjetas: jsonTarjetas,
            documento: documento,
            nombres: nombres,
            credito: jsoncredito,                    
            // json: firebase.firestore.FieldValue.arrayUnion(json) 
         }, { merge: true })
         .then(function() {           
          
          console.log("bien");
           loading.dismiss();          
         }).catch((error: any) => {
           loading.dismiss(); 
           console.log(error);
           console.log(error);
         });
      
     }

     async Alert(mensaje, subtitulo) {
      const alert = await this.alertCtrl.create({
        header: mensaje,
        subHeader: subtitulo,
        buttons: [
          {
            text: 'OK',
            handler: data => console.log("ok"),
            role: '',
          },
        ]
      });
      await alert.present();
    }
     
}
