import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { TokenizedKeyboradComponent } from './components/tokenized-keyborad/tokenized-keyborad.component';
import {  FormsModule } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TransferenciaComponent } from './components/transferencia/transferencia.component';

const config = {
    apiKey: "AIzaSyBnMxjp6qWfzobip2cwG9zXu45QQE2roIw",
    authDomain: "mybank-ce85a.firebaseapp.com",
    projectId: "mybank-ce85a",
    storageBucket: "mybank-ce85a.appspot.com",
    messagingSenderId: "330275154626",
    appId: "1:330275154626:web:577eec093132b00f32a95b",
    measurementId: "G-289E25ZQ5J"
};

firebase.initializeApp(config);
/*const db = firebase.firestore();
db.enablePersistence();*/
const db = firebase.firestore();

@NgModule({
  declarations: [AppComponent, TokenizedKeyboradComponent, TransferenciaComponent],
  entryComponents: [TokenizedKeyboradComponent, TransferenciaComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(),     
     AppRoutingModule,
     FormsModule,
     HttpClientModule,
    ],
  providers: [ SplashScreen, 
                StatusBar, 
                GooglePlus,
                NativeStorage,
                Geolocation,                
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
