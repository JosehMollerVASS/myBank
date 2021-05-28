import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tarjeta'
})
export class TarjetaPipe implements PipeTransform {

  transform(value){
    console.log(value)
    let a = value.substring(0, 4);
    let b =  value.substring(4, 8);
    let c =  value.substring(8, 12);
    let d =  value.substring(12, 16);
    let str = a+' '+b+' '+c+' '+d;
    return str;
  }

}
