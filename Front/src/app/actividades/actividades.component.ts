import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/apiservice.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import {IPreferencia, IClimaResponse} from '../core/models/response.interface';
import { Observable, map, forkJoin, of} from 'rxjs';


@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
public isLogueado = false;
public perfilUsuario: KeycloakProfile | null = null;
public preferenciasResponse : IPreferencia[]  | null = null;
public actividadesResponse: IPreferencia[] | null = null;
public climaResponse: IClimaResponse | null = null;
public actividadesFactibles : IPreferencia[]  | null = null;
public prefEmpty : boolean = false;
//URL acepta Nombre, dirección, código plus o ID de lugar "q=City+Hall,New+York,NY"
private urlBase:string = "https://www.google.com/maps/embed/v1/search?key=AIzaSyBUcr2sITl93oV9QiSycwPieaIGduvrat4&q=";
private ubicacion:string = "Concepción+del+Uruguay"
private persistentCoordinates: { latitude: number, longitude: number } | null = null;

constructor(private readonly keycloak: KeycloakService,private apiService: ApiService) {}

sonidoCard() { 
        var sonido = new Audio('../../assets/sounds/CardSound.mp3');
        sonido.volume = 0.5;
        sonido.play();
      }

   actividades = [
       {nombre: 'Pesca', imagen: 'https://media-public.canva.com/89OdA/MAD95E89OdA/1/tl.png' } ,
       {nombre: 'Senderismo', imagen: 'https://media-public.canva.com/mQYyw/MAEWSDmQYyw/1/tl.png' }, 
       {nombre: 'Correr', imagen: 'https://media-public.canva.com/nhCaI/MAEcNYnhCaI/1/tl.png' } ,
       {nombre: 'Golf', imagen: 'https://media-public.canva.com/17QDU/MAEpaH17QDU/1/tl.png'},
       {nombre: 'Camping', imagen: 'https://media-public.canva.com/l3pQo/MAEZBml3pQo/1/tl.png'},
       {nombre: 'Futbol', imagen: 'https://media-public.canva.com/IpIqA/MAEiSZIpIqA/1/tl.png'},
       {nombre: 'Actividades hogareñas', imagen: 'https://media-public.canva.com/ZnY-s/MAFfV3ZnY-s/1/tl.png'}
     ];

  async ngOnInit() {
    this.apiService.getLocation().then((coordinates) => {
      console.log(`Latitude: ${coordinates.latitude}, Longitude: ${coordinates.longitude}`);
      this.persistentCoordinates = {latitude: coordinates.latitude, longitude: coordinates.longitude}
    })
    .catch((error) => {
      console.error('Error getting location:', error);
    });
    this.actualizarMapa(this.ubicacion);
    this.isLogueado = await this.keycloak.isLoggedIn();

    if (this.isLogueado) {
      this.perfilUsuario = await this.keycloak.loadUserProfile();
      if (this.perfilUsuario && this.perfilUsuario.username) {
        this.apiService.getPreferenciasUsuario(this.perfilUsuario.username).subscribe(preferencias => {;
          if (preferencias.length == 0) {
            this.prefEmpty = true;
            this.apiService.getActividades().subscribe(preferencias => {
              this.actividadesFactibles = this.analizarActividades(preferencias);
            });
          }
          else{
            this.actividadesFactibles = this.analizarActividades(preferencias);
            console.log("Actividades factibles: ", this.actividadesFactibles);
          }
        });
      }
    }
    else {
      this.apiService.getActividades().subscribe(preferencias => {
        this.actividadesFactibles = this.analizarActividades(preferencias);
        console.log("Actividades factibles: ", this.actividadesFactibles)
      });
    }
    
    
  }

  getImagenActividad(nombreActividad: string): string {
    const actividadEncontrada = this.actividades.find(actividad => actividad.nombre === nombreActividad);
    return actividadEncontrada ? actividadEncontrada.imagen : ''; //Return ternario (Si encuentra una url devuelve lo de la izquirda de los 2 puntos, si no lo de la derecha)
  }
  
  esFactible( valoresAceptables: IPreferencia): Observable<boolean> {
    if (this.persistentCoordinates) {
      return this.apiService.getClima(this.persistentCoordinates.latitude,this.persistentCoordinates.longitude).pipe(
        map((climaResponse) => {
          if (
            climaResponse.daily.temperature_2m_min[0] >= valoresAceptables.tempmin &&
            climaResponse.daily.temperature_2m_max[0] <= valoresAceptables.tempmax &&
            climaResponse.daily.precipitation_probability_max[0] >= valoresAceptables.precipitacionmin &&
            climaResponse.daily.precipitation_probability_max[0] <= valoresAceptables.precipitacionmax &&
            climaResponse.daily.wind_speed_10m_max[0] >= valoresAceptables.vientomin &&
            climaResponse.daily.wind_speed_10m_max[0] <= valoresAceptables.vientomax
          ) {
            return true;
          } else {
            return false;
          }
        })
      );
    }
    else {
      return of(false);
    }
    
  }

  analizarActividades(actividades: IPreferencia[]) {
    const actividadesFactibles: IPreferencia[] = [];
  
    const observables = actividades.map(actividad => this.esFactible(actividad));
  
    forkJoin(observables).subscribe(resultados => {
      resultados.forEach((resultado, index) => {
        if (resultado) {
          actividadesFactibles.push(actividades[index]);
        }
      });
    });
  
    return actividadesFactibles;
  }

  buscarEnMapa(nombreActividad:string): void {
    location.href = '#mapa';
    let nuevaURL = nombreActividad + "," + this.ubicacion;
    this.actualizarMapa(nuevaURL);
  }

  actualizarMapa(cadenaBuscada:string){
    var iframe = document.getElementById('mapaGoogle');

    if (iframe) {
      console.log(iframe.getAttribute('src'));
      var nuevoSrc = this.urlBase + cadenaBuscada;
      iframe.setAttribute('src', nuevoSrc);
    }
  }

}


