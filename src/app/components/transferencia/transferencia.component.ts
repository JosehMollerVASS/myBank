import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { BarcodeScanner, BarcodeScannerOptions  } from '@ionic-native/barcode-scanner/ngx';
@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss'],
})
export class TransferenciaComponent implements OnInit {
datos;
valor;
prueba=[];
tarjetas;
creditos;
value;
scannedData: any;
  encodedData: '';
  encodeData: any;
  inputData: any;
  constructor(public poper: PopoverController, public modal: ModalController, public navParams:NavParams,
            private barcodeScanner: BarcodeScanner) {
    let data = this.navParams.get('data'); 
    this.datos = JSON.parse(data); 
    this.valor =this.navParams.get('valor'); 
    this.value =this.navParams.get('value'); 
    console.log(this.datos)

      this.tarjetas = this.datos[0].tarjetas;
      this.creditos = this.datos[0].credito;
   }

  ngOnInit() {}

  async seleccionarTarjeta(data, orig){    
    console.log("clic acepotar");
    data.val = this.value;
    this.poper.dismiss(data, orig);
    
  }
enable=true;
  otraCuenta(event){
    this.numeroTarjeta="";
    if (this.enable) {
      this.enable = false;
    }else{
      this.enable = true
    }
    console.log(event)
  }

  aceptar(){
    let datos = {cod: this.numeroTarjeta, monto: "0", movimiento:[], vence:{}};
    this.poper.dismiss(datos, "externo");
    
  }
numeroTarjeta;
  numeroTarjtea(event){
    console.log(event)
    this.numeroTarjeta= event.detail.value;
  }

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
  
}
