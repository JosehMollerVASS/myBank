import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(val){
    let sec = val.seconds;
    let fecha = new Date(sec*1000);
    console.log(val);
    return fecha.toLocaleDateString("en-US");
  }

}
