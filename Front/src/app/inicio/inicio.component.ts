import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/apiservice.service';
import { IClimaResponse } from '../core/models/response.interface';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  climaImagenURL = ""
  public climaResponse : IClimaResponse  | null = null;

  constructor(private apiService: ApiService) {}

  public async ngOnInit() {
    this.obtenerImagenClima()
    this.apiService.getClima(-144,33).subscribe(resp => {this.climaResponse= resp;
  
      console.log("Fecha: ", this.climaResponse.daily.time[0]);
      console.log("Temperatura Máxima: ", this.climaResponse.daily.temperature_2m_max[0]);
      console.log("Temperatura Minima: ", this.climaResponse.daily.temperature_2m_min[0]);
      console.log("Precipitación: ", this.climaResponse.daily.precipitation_probability_max[0]);
      console.log("Velocidad del Viento: ", this.climaResponse.daily.wind_speed_10m_max[0]);
    }
      );
    
  }
  

  obtenerImagenClima() {
    // Aquí debería implementarse la lógica para obtener la imagen del clima.
    // Devuelve la URL de la imagen.
    return this.climaImagenURL = "../../assets/images/Soleado.png";
  }

}
