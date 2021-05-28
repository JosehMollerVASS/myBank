import { Component, OnInit } from '@angular/core';
import { Forecast, Main, Weather, Wind } from 'src/app/common/interfaces/forecast';
import { ClimaService } from 'src/app/services/clima.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-clima',
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
})
export class ClimaPage implements OnInit {

  resultado: Forecast = {};
    temperatura: Main = {};
    weatherDesc: Weather = {};
    viento: Wind = {};

    lat: string;
    lon: string;

    logicColor = 'light';
  constructor(private weather: ClimaService,
    private geolocation: Geolocation) { }

    async ngOnInit() {
 
        console.log("clima")
      const date = new Date();
      if (date.getHours() > 19 && date.getHours() < 8) {
          this.logicColor = 'dark';
      }

      const location = await this.geolocation
          .getCurrentPosition()
          .then(pos => {
              this.lat = pos.coords.latitude.toString();
              this.lon = pos.coords.longitude.toString();
          })
          .catch(err => console.log(err));
      this.weather
          .getForecastNow(this.lat, this.lon)
          .subscribe((resp: Forecast) => {
              this.resultado = resp;
              this.temperatura = resp.main;
              this.weatherDesc = resp.weather[0];
              this.viento = resp.wind;
              console.log(this.resultado);
          });
     
  }
}
