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
public climaActual : String = "";
public textoDia : String = "";
public climaImagenURL: String = "";
public climaResponse : IClimaResponse  | null = null;

  sonidoButton() { 
    var sonido = new Audio('../../assets/sounds/ButtonSound.wav');
    sonido.volume = 0.5;
    sonido.play();
  }

  sonidoWoosh() { 
    const audioCtx = new AudioContext();
    const audioElement = new Audio('../../assets/sounds/Woosh.wav');
    const source = audioCtx.createMediaElementSource(audioElement);
    const gainNode = audioCtx.createGain();

    gainNode.gain.value = 0.5; // Ajustar volumen
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    audioElement.playbackRate = 5; // Ajustar velocidad

    audioElement.play();
  }

  constructor(private apiService: ApiService, private locationService: LocationService) {}

  public async ngOnInit() {
    // Obtiene la latitud de la ubicación actual
    const latitude = <number>this.locationService.getLatitude();
    const longitude = <number>this.locationService.getLongitude();
    console.log("Latitud service: ", latitude);

    // Verifica si se obtuvo la latitud
    if (latitude) {
      const dia = <number>this.locationService.getDia()
      if (dia == 0) {
        this.textoDia = "actual"
      }
      else {
        if (dia == 1){
          this.textoDia = "a " + dia + " día"
        }
        else{
          this.textoDia = "a " + dia + " días"
        }   
      }
      // Si hay latitud, se obtiene el clima usando las coordenadas actuales
      this.fetchWeatherForcast(latitude, longitude, dia);
    } else {
      // Si no hay latitud, se obtienen primero las coordenadas y luego el clima
      await this.fetchLocationAndWeather();
    }

    
  }

  /**
   * Obtiene el pronóstico del clima segun una lat, long y un forcast específico.
   * @param {number} latitude - Latitud de la ubicación.
   * @param {number} longitude - Longitud de la ubicación.
   * @param {number} dia - Índice del día para obtener el clima (empezando desde 0 para el dia actual).
   * @returns {void}
  */
  private fetchWeatherForcast(latitude: number, longitude: number, dia: number): void {
    // Obtiene el clima utilizando las coordenadas proporcionadas y actualiza
    this.apiService.getClima(latitude, longitude).subscribe({
      next: (climaResponse) => {
        // Actualiza el clima actual y la URL de la imagen del clima
        this.updateWeatherInfo(climaResponse.daily.weather_code[dia]);
      },
      error: (error) => {
        console.error("Error al obtener el clima:", error);
      }
    });
  }

  /**
   * Obtiene las coordenadas de ubicación y en base a eso el pronóstico del clima actual.
   * 
   * Llama a la función fetchWeatherForcast para obtener el pronóstico.
   * @returns {Promise<void>}
  */
  private async fetchLocationAndWeather(): Promise<void> {
    // Obtiene las coordenadas usando el servicio de API
    const coordinates = await this.apiService.getLocation().catch((error) => {
      console.error('Error getting location:', error);
    });
    if (coordinates) {
      // Si se obtienen las coordenadas, obtiene el clima utilizando esas coordenadas
      this.fetchWeatherForcast(coordinates.latitude, coordinates.longitude, 0);
    }
  }
  
  /**
   * Actualiza las variables que se muestran en el html con información del clima 
   * en función del código de clima proporcionado.
   * @param {number} weatherCode - Código de clima.
   * @returns {void}
  */
  private updateWeatherInfo(weatherCode: number): void {
    this.climaActual = this.codigoClima(weatherCode);
    this.climaImagenURL = this.imagenClima(weatherCode);
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
        51: "Llovizna ligera",
        53: "Llovizna moderada",
        55: "Llovizna densa",
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
