import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss'],
})
export class TransferenciaComponent implements OnInit {
datos;
  constructor(public poper: PopoverController, public modal: ModalController, public navParams:NavParams) {
    this.datos =this.navParams.get('data'); 
    console.log(this.datos)
   }

  ngOnInit() {}

}
