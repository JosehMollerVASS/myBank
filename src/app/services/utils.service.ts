import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(public alertCtrl: AlertController) { }

  static checkOnlyNumbers($event: any) {
    const regex = /[0-9]+/g;
    const resp = $event.target.value.match(regex);
    return $event.target.value = resp ? resp.join('') : '';
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

  public formatoFecha(fecha) {
    let date = new Date(fecha);
    let anio = date.getFullYear().toString();
    let mes = ("0" + (date.getMonth() + 1)).slice(-2)
    let dia = ("0" + date.getDate()).slice(-2);    
    return   dia+"-" + mes + "-" + anio
  }
}
