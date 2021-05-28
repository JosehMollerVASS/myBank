import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Forecast } from 'src/app/common/interfaces/forecast';
const apiKey = '';
@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  constructor(private http: HttpClient) { }

  public getForecastNow<Forecast>(lat: string, lon: string) {
    const query = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lat=${lat}&lon=${lon}`;
    return this.http.get<Forecast>(query);
}
}
