import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { TransferenciaComponent } from 'src/app/components/transferencia/transferencia.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  user;
  datosUsuario;
  utils = UtilsService;
  constructor(private activateRoute: ActivatedRoute, public popoverController: PopoverController,
              private firebaseService: FirebaseService, private alertCtrl: AlertController,
              public utilsService: UtilsService, private router: Router) { 
    this.user = this.activateRoute.snapshot.paramMap.get('user');
    this.datosUsuario = firebaseService.usuario;
    console.log(this.user)
  }

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
      header: "Transferir dinero a:",      
      buttons: [
        {
          text: 'Mis cuentas',
          handler: data => this.AlertaCita(this.datosUsuario, '0'),
          role: '',          
        },
        {
          text: 'Otras cuentas',
          handler: data => this.AlertaCita(this.datosUsuario, '1'),
          role: '',
        },
        
      ]
      //buttons: ['Eliminar cita','OK']
    });
    alert.present();
  }


  async AlertaCita(dato, valor) {
    const popover = await this.popoverController.create({
    component: TransferenciaComponent,
    //event: event,
    animated: true,
    translucent: true,
    componentProps:{
      data: dato, valor: valor
    }
  });    
  popover.onDidDismiss().then((data=>{
    console.log("onDidDismiss: "+JSON.stringify(data)  );
    console.log(data)
  }))
  popover.dismiss().then((data=>{
    console.log("dismiss: "+JSON.stringify(data));
  }))
  return await popover.present();
}
}
