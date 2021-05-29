import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { TransferenciaComponent } from 'src/app/components/transferencia/transferencia.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import firebase from 'firebase';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  user;
  usuario;
  datosUsuario:any;  
  utils = UtilsService;
  private db: any; 
  constructor(private activateRoute: ActivatedRoute, public popoverController: PopoverController,
              private firebaseService: FirebaseService, private alertCtrl: AlertController,
              public utilsService: UtilsService, private router: Router) { 
    this.user = this.activateRoute.snapshot.paramMap.get('user');
    let id = JSON.parse(this.user);
    const _this = this; // 'this' inside 'subscribe' refers to the observable object
this.list = this.firebaseService.getDataUsusario(id[0].documento);
console.log(" XD 1: ",this.list);
this.list
  .subscribe({
    next(posts) {   
      _this.xuaL=[];           
      for (let i = 0; i < posts.length; i++) {   
        _this.xuaL.push(posts[i])             
      }      
      _this.debito = posts[0].tarjetas;
      _this.credito = posts[0].credito;
      _this.auxLista = _this.xuaL;
      _this.auxli = _this.xuaL;  
      console.log(" XD 2: ples ",_this.auxLista);      
    },
     // optional
  }); 
  }


  xuaL=[];
  list;
  auxLista;
  auxli;
  debito=[];
  credito=[];
  ngOnInit() {
  }

  verMovimiento(data){
    this.router.navigate(['/movimiento', JSON.stringify(data)]);
  }

  verClima(){
    this.router.navigate(['/clima']);    
  }

  async onEventSelected() {
    // Use Angular date pipe for conversion
    
    const alert = await this.alertCtrl.create({
      header: "Transfiere o Recibe dinero fácil",      
      buttons: [
        {
          text: 'Transferir',
          handler: data => this.AlertaCita(this.auxLista, '0'),
          role: '',          
        },
        {
          text: 'Recibir',
          handler: data => this.AlertaCita(this.auxLista, '1'),
          role: '',
        },
        
      ]
      //buttons: ['Eliminar cita','OK']
    });
    alert.present();
  }


  async AlertaCita(dato, valor) {
    this.router.navigate(['/transferencia', JSON.stringify(dato), valor, JSON.stringify(this.user)]);
}
}
