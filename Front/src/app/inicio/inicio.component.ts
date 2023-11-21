import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/apiservice.service';
import { IClimaResponse } from '../core/models/response.interface';
import { LocationService } from '../core/services/actFutura.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
private persistentCoordinates: { latitude: number, longitude: number } | null = null;
public climaActual : String = "";
public climaImagenURL: String = "";
public climaResponse : IClimaResponse  | null = null;

  constructor(private apiService: ApiService, private locationService: LocationService) {}

  public async ngOnInit() {
    console.log("Latitud: ", this.locationService.getLatitude())
    if (this.locationService.getLatitude()){
      this.apiService.getClima(<number>this.locationService.getLatitude(), <number>this.locationService.getLongitude())
      .subscribe({
        next: (climaResponse) => {
          console.log("Tiene coordenadas custom: ",this.locationService.getLatitude(), this.locationService.getLongitude())
          this.persistentCoordinates = { latitude: <number>this.locationService.getLatitude(), longitude: <number>this.locationService.getLongitude() };
          this.climaActual = this.codigoClima(climaResponse.daily.weather_code[<number>this.locationService.getDia()]);
          this.climaImagenURL = this.imagenClima(climaResponse.daily.weather_code[<number>this.locationService.getDia()]);
        },
        error: (error) => {
          console.error("Error al obtener el clima:", error);
        }
      });
  }
  else {
    await this.apiService.getLocation().then((coordinates) => {
      this.persistentCoordinates = { latitude: coordinates.latitude, longitude: coordinates.longitude };
      if (this.persistentCoordinates) {
        this.apiService.getClima(this.persistentCoordinates.latitude, this.persistentCoordinates.longitude)
          .subscribe({
            next: (climaResponse) => {
              console.log("No tiene coordenadas custom")
              this.climaActual = this.codigoClima(climaResponse.daily.weather_code[0]);
              this.climaImagenURL = this.imagenClima(climaResponse.daily.weather_code[0]);
            },
            error: (error) => {
              console.error("Error al obtener el clima:", error);
            }
          });
      }      
    });      
  }
  
}

  
  toggleModal() {
    const modal: any = document.querySelector('#modalFuturo'); 
    modal.style.display = 'block'; 
  }

  closeModal() {
    const modalFuturo: any = document.querySelector('#modalFuturo'); 
    modalFuturo.style.display = 'none';  
  }
  
  codigoClima(codigo: number): string {
    const weatherCases: Record<number, string> = {
        0: "Cielo limpio",
        1: "Principalmente despejado",
        2: "Parcialmente nublado",
        3: "Cubierto",
        45: "Niebla",
        48: "Niebla espesa",
        51: "Llovizna de ligera",
        53: "Llovizna de moderada",
        55: "Llovizna de densa",
        56: "Llovizna helada ligera",
        57: "Llovizna helada densa",
        61: "Lluvia leve",
        63: "Lluvia moderada",
        65: "Lluvia fuerte",
        66: "Lluvia helada ligera",
        67: "Lluvia helada fuerte",
        71: "Caída de nieve leve",
        73: "Caída de nieve moderada",
        75: "Caída de nieve fuerte",
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


 imagenClima(codigo: number): string {
    let resultado = "";

    switch (codigo) {
        //Sunny
        case 0:
        case 1:
            resultado = "../../assets/images/Sunny.png";
            break;
        //Nublado    
        case 2:
        case 3:
            resultado = "../../assets/images/cloudy.png";
            break;
        //Llovizna   
        case 51:
        case 53:
        case 55:
        case 61:
        case 63:
        case 80:
        case 81:
        case 95:
            resultado = "../../assets/images/rainy.png";
            break;
        //Tormenta Fuerte   
        case 65:
        case 82:
        case 99: 
          resultado = "../../assets/images/heavy-rain.png";
          break;
        //Snow    
        case 67:
        case 71:          
        case 73:
        case 86:
            resultado = "../../assets/images/snow.png";
            break;  
        //Full-snow    
        case 75:
        case 77:
            resultado = "../../assets/images/Full-snow.png";
            break;
        //Llovizna-helada    
        case 56:
        case 57:          
        case 66:
        case 86:
        case 96:
            resultado = "../../assets/images/Llovizna-helada.png";
            break;   
        //Mist    
        case 45:
        case 48:
            resultado = "../../assets/images/mist.png";
            break;              
        default:
            resultado = "../../assets/images/cloudy.png";
            break;
    }

    return resultado;
    
}

}
