import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController, ToastController } from '@ionic/angular';
import { TransferenciaComponent } from 'src/app/components/transferencia/transferencia.component';
import { BarcodeScanner, BarcodeScannerOptions  } from '@ionic-native/barcode-scanner/ngx';
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.page.html',
  styleUrls: ['./transferencia.page.scss'],
})
export class TransferenciaPage implements OnInit {
data;
valor;
titulo;
tarjeta = "xxxxxxxxxxxxxxxx"
tipoTarjtea;
tarjetaDestino = "xxxxxxxxxxxxxxxx"
tipoTarjteaDestino;
scannedData: any;
  encodedData: '';
  encodeData: any;
  inputData: any;
  user;
  constructor(private activateRoute: ActivatedRoute, public popoverController: PopoverController,
              private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController,
              private firebaseService: FirebaseService, private router: Router) {
   this.data = this.activateRoute.snapshot.paramMap.get('data');
   this.valor = this.activateRoute.snapshot.paramMap.get('valor');
   this.user = this.activateRoute.snapshot.paramMap.get('user');
   if (this.valor == '0') {
     this.titulo = 'Transfiere Dinero'
   }else{
    this.titulo = 'Recibe Dinero'
   }
   console.log(this.data);
   }

  ngOnInit() {
  }
montoMaximo=0.00;
  async abrirCuentas(value) {
    const popover = await this.popoverController.create({
    component: TransferenciaComponent,
    //event: event,
    animated: true,
    translucent: true,
    componentProps:{
      data: this.data, valor: this.valor, value: value
    }
  });    
  popover.onDidDismiss().then((data=>{
    console.log("onDidDismiss: "+JSON.stringify(data)  );
       if (data.data.val == undefined) {
        this.tarjetaDestino = data.data.cod;
        this.tipoTarjteaDestino = "externo"; 
       }
       if (data.data.val == "origen") {
        this.tarjeta = data.data.cod;
        this.tipoTarjtea = data.role;
        this.montoMaximo = Number(data.data.monto) ;
       }else if(data.data.val == "destino"){
        this.tarjetaDestino = data.data.cod;
        this.tipoTarjteaDestino = data.role;
       }
  }))
  popover.dismiss().then((data=>{
    console.log("dismiss: "+JSON.stringify(data));
    
  }))
  return await popover.present();
}

enable=true;
otroMonto(event){
    this.montoTrans="";
    if (this.enable) {
      this.enable = false;
    }else{
      this.enable = true
    }
    console.log(event)
  }

montoTrans=""
nuevoMonto(event){
  console.log(event)
  this.montoTrans= event.detail.value;
}



//BARCODE
scanBarcode() {
  const options: BarcodeScannerOptions = {
    preferFrontCamera: false,
    showFlipCameraButton: true,
    showTorchButton: true,
    torchOn: false,
    prompt: 'Place a barcode inside the scan area',
    resultDisplayDuration: 500,
    formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
    orientation: 'portrait',
  };

  this.barcodeScanner.scan(options).then(barcodeData => {
    console.log('Barcode data', barcodeData);
    this.scannedData = barcodeData;

  }).catch(err => {
    console.log('Error', err);
  });
}

createBarcode() {
  let aux = JSON.parse(this.data);
  if (Number(this.montoTrans) && Number(this.montoTrans) > 0 ) {
    this.inputData={nombre: aux[0].nombres, apellidos: aux[0].apellidos,  documento: aux[0].documento, monto: this.montoTrans, cuenta: this.tarjetaDestino}
  }else{
    this.inputData={nombre: aux[0].nombres, apellidos: aux[0].apellidos,  documento: aux[0].documento, cuenta: this.tarjetaDestino}
  }
  
  this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.inputData).then((encodedData) => {
    console.log(encodedData);
    this.encodedData = encodedData;
  }, (err) => {
    console.log('Error occured : ' + err);
  });
}

procesarTransaccion(){
let aux = true;  
  if (!Number(this.montoTrans) || Number(this.montoTrans)<= 0) {
    aux = false;
    this.showToast("ingresa un monto Válido")
  }else{
    aux = true;
  }
  if (this.tarjetaDestino.substring(1,4) == 'xxx' || this.tarjeta.substring(1,4) == 'xxx') {
    aux = false;
    this.showToast("verifique sus Tarjetas")
  }else{
    aux = true;
  }
  if (this.montoMaximo < Number(this.montoTrans)) {
    aux = false;
    this.showToast("no tienes Fondos Suficientes")
  }else{

  }
if (aux == true) {
  console.log("evento")
  let data = JSON.parse(this.data);
  let tarjetas = data[0].tarjetas;
  let tarCredito = data[0].credito;
  let user = JSON.parse(this.user);
  let us = JSON.parse(user);
  for (let index = 0; index < tarjetas.length; index++) {
    if (tarjetas[index].cod == this.tarjeta) {
      tarjetas[index].monto = Number(tarjetas[index].monto) - Number(this.montoTrans) ;
      tarjetas[index].movimiento.push({monto: "- "+this.montoTrans, dia: this.formatofecha()})
    }    
  }
  for (let index = 0; index < tarCredito.length; index++) {
    if (tarCredito[index].cod == this.tarjeta) {
      tarCredito[index].monto = Number(tarCredito[index].monto) - Number(this.montoTrans) ;
      tarCredito[index].movimiento.push({monto:"- "+ this.montoTrans, dia: this.formatofecha()})
    }    
  }
  if (this.tipoTarjteaDestino !== "externo") {
    for (let index = 0; index < tarjetas.length; index++) {
      if (tarjetas[index].cod == this.tarjetaDestino) {
        tarjetas[index].monto = Number(tarjetas[index].monto) + Number(this.montoTrans) ;
        tarjetas[index].movimiento.push({monto: "+ "+this.montoTrans, dia: this.formatofecha()})
      }    
    }
    for (let index = 0; index < tarCredito.length; index++) {
      if (tarCredito[index].cod == this.tarjetaDestino) {
        tarCredito[index].monto = Number(tarCredito[index].monto) + Number(this.montoTrans);
        tarCredito[index].movimiento.push({monto:"+ "+ this.montoTrans, dia: this.formatofecha()})
      }    
    }
  }
 this.firebaseService.movimientoTarjeta(data[0].password, data[0].apellidos, tarjetas, data[0].documento,  data[0].nombres, tarCredito, us[0].id).then(
  //
  doc=>{this.AlertaCita() } 
  
 )
}
}

async AlertaCita() {
  this.router.navigate(['/exito', JSON.parse(this.user) ]);
}

async showToast(mensaje) {
  const toast = await this.toastCtrl.create({
    message: mensaje,
    position: 'bottom',
    duration: 2000, 
  });
  toast.present();
}

public formatofecha() {
  let date = new Date();
  let anio = date.getFullYear().toString();
  let mes = ("0" + (date.getMonth() + 1)).slice(-2)
  let dia = ("0" + date.getDate()).slice(-2);  
  return dia+"/"+mes+"/"+anio
}
}
