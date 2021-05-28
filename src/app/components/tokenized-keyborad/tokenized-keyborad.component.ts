
import { Component, OnInit,} from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ModalController, PopoverController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-tokenized-keyborad',
  templateUrl: './tokenized-keyborad.component.html',
  styleUrls: ['./tokenized-keyborad.component.scss'],
})
export class TokenizedKeyboradComponent implements OnInit {

  documento=[];
  numerosA = [1 ,2, 3, 4, 5, 6, 7, 8, 9, 0]
  
  constructor(public poper: PopoverController, public modal: ModalController,
              public utilsService: UtilsService, public nativeStorage: NativeStorage) { 

  }
  ngOnInit() {
    this.numerosA.sort(function () {
      return Math.random() - 0.5 
    })
  }
  documeExpuesto=""
numeroPresaionado(posicion){
  this.documeExpuesto=""
  let valor = this.numerosA[posicion];
  this.documento.push(valor);  
  for (let index = 0; index < this.documento.length; index++) {
    this.documeExpuesto = this.documeExpuesto+"•";    
  }
}

  async aceptarPopOver(){
    let data = {doc: this.documento}
    console.log("clic acepotar");
    this.poper.dismiss(data, this.documeExpuesto);
    
  }
  
  retrocederNumero(){
    this.documeExpuesto="";
    this.documento.pop();    
    for (let index = 0; index < this.documento.length; index++) {
      this.documeExpuesto = this.documeExpuesto+"•";    
    }
    console.log(this.documento)
  }

}
