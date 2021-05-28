import { Pipe, PipeTransform } from '@angular/core';

const url = 'http://openweathermap.org/img/wn/';
@Pipe({
  name: 'climaIcons'
})
export class ClimaIconsPipe implements PipeTransform {

  transform(imagen: string, size: string = '@2x.png'): string {
    if (!imagen) {
        return `${url}02d${size}`;
    }

    const imgUrl = `${url}${imagen}${size}`;
    return imgUrl;
}

}
