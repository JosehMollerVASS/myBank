import { from } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, Platform, PopoverController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import {DNI_LENGTH, DOC_PLACEHOLDER } from '../common/utils/utils.constants';
import { Router } from '@angular/router';
import { TokenizedKeyboradComponent } from '../components/tokenized-keyborad/tokenized-keyborad.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  showLogin = true;
  isPasswordBlocked: boolean;
  storageItemsLoaded: boolean;
  isKeyboardOpen: boolean;
  loginButtonDisabled: boolean;
  identifier: number;
  documentNumberLength: number;
  documentNumberPlaceholder: string;
  errorMessage: string;  
  documento="";
  password=""
  docExpuesto="";
  utils = UtilsService;
  constructor( private platform: Platform, private firebaseService: FirebaseService,
    public loadingController: LoadingController,
    public popoverController: PopoverController, public utilsService: UtilsService,
      public nativeStorage: NativeStorage,
    public alertCtrl: AlertController
    ) {
    this.documentNumberLength = DNI_LENGTH;
    this.documentNumberPlaceholder = DOC_PLACEHOLDER;

    }
    
    ngOnInit() {
     
    }

  loginGoogle() {
    if (this.platform.is('android')) {
      this.firebaseService.loginGoogleAndroid();
    } else {
      this.firebaseService.loginGoogleWeb();
    }
  }


    async abrirTeclado(event) {
      const popover = await this.popoverController.create({
      component: TokenizedKeyboradComponent,
      event: event,
      animated: true,
      translucent: true,
      /*componentProps:{
        fecha: {fechaAsistencia: fechaAsistencia, diaActual: diaActual} 
      }*/
    });    
    popover.onDidDismiss().then((data=>{
      console.log("onDidDismiss: "+JSON.stringify(data)  );
      if (data.role != "backdrop") {
        this.docExpuesto=data.role;
        this.password = "";
        for (let index = 0; index < data.data.doc.length; index++) {
          this.password = this.password+data.data.doc[index];          
        }        
      }      
    }))
    popover.dismiss().then((data=>{
      console.log("dismiss: "+JSON.stringify(data));
    }))
    return await popover.present();
  }
  
  validarUsuario(){
    console.log(this.documento)
    this.firebaseService.getDataUsuario(this.documento, this.password)
  }

  numeroDoc(event){
    console.log(event)
    this.documento= event.detail.value;
  }

  getPassword(event){
    this.password= event.detail.value;
  }

  
}
