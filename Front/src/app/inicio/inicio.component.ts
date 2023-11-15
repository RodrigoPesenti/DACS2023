import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/apiservice.service';
import { IClimaResponse } from '../core/models/response.interface';
import { map} from 'rxjs';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
private persistentCoordinates: { latitude: number, longitude: number } | null = null;
public climaActual : String = "";

  climaImagenURL = ""
  public climaResponse : IClimaResponse  | null = null;

  constructor(private apiService: ApiService) {}

  public async ngOnInit() {
    await this.apiService.getLocation().then((coordinates) => {
      this.persistentCoordinates = { latitude: coordinates.latitude, longitude: coordinates.longitude };
      if (this.persistentCoordinates) {
        this.apiService.getClima(this.persistentCoordinates.latitude, this.persistentCoordinates.longitude)
          .subscribe({
            next: (climaResponse) => {
              this.climaActual = this.codigoClima(climaResponse.daily.weather_code[0]);
            },
            error: (error) => {
              console.error("Error al obtener el clima:", error);
            }
          });
      }
    });
    this.obtenerImagenClima();
  }
  
  
  
  
  codigoClima(codigo: number): string {
    const weatherCases: Record<number, string> = {
        0: "Cielo limpio",
        1: "Principalmente despejado, parcialmente nublado y cubierto",
        2: "Principalmente despejado, parcialmente nublado y cubierto",
        3: "Principalmente despejado, parcialmente nublado y cubierto",
        45: "Niebla y depósito de niebla de escarcha",
        48: "Niebla y depósito de niebla de escarcha",
        51: "Llovizna de intensidad ligera",
        53: "Llovizna de intensidad moderada",
        55: "Llovizna de intensidad densa",
        56: "Llovizna helada de intensidad ligera",
        57: "Llovizna helada de intensidad densa",
        61: "Lluvia de intensidad leve",
        63: "Lluvia de intensidad moderada",
        65: "Lluvia de intensidad fuerte",
        66: "Lluvia helada de intensidad ligera",
        67: "Lluvia helada de intensidad fuerte",
        71: "Caída de nieve de intensidad leve",
        73: "Caída de nieve de intensidad moderada",
        75: "Caída de nieve de intensidad fuerte",
        77: "Granos de nieve",
        80: "Lluvias leves",
        81: "Lluvias moderadas",
        82: "Lluvias violentas",
        85: "Chubascos de nieve ligeros",
        86: "Chubascos de nieve fuertes",
        95: "Tormenta leve",
        96: "Tormenta con granizo leve",
        99: "Tormenta con granizo fuerte",
    };

    return weatherCases[codigo] || "Clima desconocido";
  }

  devuelveClima(): void {
    if (this.persistentCoordinates) {
      this.apiService.getClima(this.persistentCoordinates.latitude, this.persistentCoordinates.longitude)
        .subscribe({
          next:(climaResponse) => {
            this.climaActual = this.codigoClima(climaResponse.daily.weather_code[0]);                    
          },
          error:(error) => {
            console.error("Error al obtener el clima:", error);
          }
      });
    }
  }




  obtenerImagenClima() {
    // Aquí debería implementarse la lógica para obtener la imagen del clima.
    // Devuelve la URL de la imagen.
    return this.climaImagenURL = "../../assets/images/Soleado.png";
    console.log("HOLADENUEVO", this.climaActual)
  }

}
