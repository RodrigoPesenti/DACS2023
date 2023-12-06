import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/apiservice.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import {IPreferencia, IClimaResponse} from '../core/models/response.interface';
import { Observable, map, forkJoin, of, delay} from 'rxjs';
import { LocationService } from '../core/services/actFutura.service';


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
public sinFactibles : boolean = false;
//URL acepta Nombre, dirección, código plus o ID de lugar "q=City+Hall,New+York,NY"
private urlBase:string = "https://www.google.com/maps/embed/v1/search?key=AIzaSyBUcr2sITl93oV9QiSycwPieaIGduvrat4";
private ubicacion:string = "Argentina, Entre Rios, Concepcion Del Uruguay"
private persistentCoordinates: { latitude: number, longitude: number } | null = null;
private dia: number | null = null;

constructor(private readonly keycloak: KeycloakService,private apiService: ApiService, private locationService: LocationService) {}

    sonidoCard() { 
            var sonido = new Audio('../../assets/sounds/CardSound.mp3');
            sonido.volume = 0.5;
            sonido.play();
          }

   actividades = [
       {nombre: 'Pesca', busqueda: 'Fishing area', imagen: 'https://media-public.canva.com/89OdA/MAD95E89OdA/1/tl.png' } ,
       {nombre: 'Senderismo',busqueda: 'Senderismo', imagen: 'https://media-public.canva.com/mQYyw/MAEWSDmQYyw/1/tl.png' }, 
       {nombre: 'Correr', busqueda: 'Area para correr', imagen: 'https://media-public.canva.com/nhCaI/MAEcNYnhCaI/1/tl.png' } ,
       {nombre: 'Golf', busqueda: 'Golf ', imagen: 'https://media-public.canva.com/17QDU/MAEpaH17QDU/1/tl.png'},
       {nombre: 'Camping', busqueda: 'Camping', imagen: 'https://media-public.canva.com/l3pQo/MAEZBml3pQo/1/tl.png'},
       {nombre: 'Futbol', busqueda: 'Futsal', imagen: 'https://media-public.canva.com/IpIqA/MAEiSZIpIqA/1/tl.png'},
       {nombre: 'Actividades hogareñas', busqueda: '', imagen: 'https://media-public.canva.com/ZnY-s/MAFfV3ZnY-s/1/tl.png'},
       {nombre: 'Teatro', busqueda: 'Teatro', imagen: 'https://media-public.canva.com/oLbHs/MAElceoLbHs/1/tl.png'},
       {nombre: 'Biblioteca', busqueda: 'Biblioteca', imagen: 'https://media-public.canva.com/_9Lmc/MAE2sP_9Lmc/1/tl.png'},
       {nombre: 'Cine', busqueda: 'Cine', imagen: 'https://media-public.canva.com/Tgr2A/MAC7OWTgr2A/2/tl.png'},
       {nombre: 'Café', busqueda: 'Café', imagen: 'https://media-public.canva.com/ltXGE/MAEhb_ltXGE/2/tl.png'}
     ];

  async ngOnInit() {
    if (this.locationService.getLatitude()){ //Si esta cargado el location service
      //Obtenemos las coordenadas del servicio e inicializamos el mapa
      this.persistentCoordinates = {latitude: <number>this.locationService.getLatitude(), longitude: <number>this.locationService.getLongitude()}
      this.ubicacion = <string>this.locationService.getAdress()
      this.inicializarMapaConUbicacion(this.ubicacion); 
      this.dia = this.locationService.getDia();
    }
    else { //Si no esta cargado el location service
      //Obtenemos las coordenadas del navegador e inicializamos el mapa
      this.apiService.getLocation().then((coordinates) => {
        this.persistentCoordinates = {latitude: coordinates.latitude, longitude: coordinates.longitude}; 
        this.inicializarMapaConLatYLong(this.persistentCoordinates.latitude, this.persistentCoordinates.longitude);
        this.dia = 0;
      })
      .catch((error) => {
        console.error('Error getting location:', error);
      });
      
    }
    
    this.isLogueado = await this.keycloak.isLoggedIn();
    if (this.isLogueado) {
      this.perfilUsuario = await this.keycloak.loadUserProfile();
      if (this.perfilUsuario && this.perfilUsuario.username) {
        this.apiService.getPreferenciasUsuario(this.perfilUsuario.username).subscribe(preferencias => {
          if (preferencias.length == 0) {//Si no posee preferencias
            this.prefEmpty = true;
            this.apiService.getActividades().subscribe(actividades => {
              this.analizarActividades(actividades).subscribe(actFact => {this.actividadesFactibles = actFact});
            });
          }
          else{//Si posee preferencias
            this.analizarActividades(preferencias).subscribe(actFact => {this.actividadesFactibles = actFact
              if (this.actividadesFactibles.length == 0) {//Si posee preferencias pero ninguna es factible (Si existen factibles no se hace nada ya que esas seran las que se muestran)
                this.sinFactibles = true;
                this.apiService.getActividades().subscribe(actividades => {
                  this.analizarActividades(actividades).subscribe(actFact => {this.actividadesFactibles = actFact});
                });   
              }
            });
            
          }
        });
      }
    }
    else {
      this.apiService.getActividades().subscribe(preferencias => {
        this.analizarActividades(preferencias).subscribe(actFact => {this.actividadesFactibles = actFact});
      });
    }
    
    
  }

  getImagenActividad(nombreActividad: string): string {
    const actividadEncontrada = this.actividades.find(actividad => actividad.nombre === nombreActividad);
    return actividadEncontrada ? actividadEncontrada.imagen : ''; //Return ternario (Si encuentra una url devuelve lo de la izquirda de los 2 puntos, si no lo de la derecha)
  }
  
  getBusquedaActividad(nombreActividad: string): string {
    const actividadEncontrada = this.actividades.find(actividad => actividad.nombre === nombreActividad);
    return actividadEncontrada ? actividadEncontrada.busqueda : ''; //Return ternario (Si encuentra una url devuelve lo de la izquirda de los 2 puntos, si no lo de la derecha)
  }

  /**
   * Verifica si los valores de clima son aceptables para una preferencia dada.
   * @param {IPreferencia} preferencia - preferencia a determinar factibilidad.
   * @returns {Observable<boolean>} - Observable que emite un valor booleano indicando si es factible o no.
  */
  esFactible( preferencia: IPreferencia): Observable<boolean> {
    if (this.persistentCoordinates) {
      return this.apiService.getClima(this.persistentCoordinates.latitude,this.persistentCoordinates.longitude).pipe(
        map((climaResponse) => {
          //console.log("Dia: ", this.dia);
          // console.log('Valores a comparar:');
          // console.log('-------------------');
          // console.log('Día:', this.dia);
          // console.log('Temperatura mínima:', climaResponse.daily.temperature_2m_min[<number>this.dia]);
          // console.log('Temperatura máxima:', climaResponse.daily.temperature_2m_max[<number>this.dia]);
          // console.log('Probabilidad de precipitación:', climaResponse.daily.precipitation_probability_max[<number>this.dia]);
          // console.log('Velocidad del viento:', climaResponse.daily.wind_speed_10m_max[<number>this.dia]);
          // console.log('Valores aceptables:');
          // console.log('-------------------');
          // console.log('Nombre actividad: ', valoresAceptables.nombre)
          // console.log('TempMin Aceptable:', valoresAceptables.tempmin);
          // console.log('TempMax Aceptable:', valoresAceptables.tempmax);
          // console.log('Precipitación Min Aceptable:', valoresAceptables.precipitacionmin);
          // console.log('Precipitación Max Aceptable:', valoresAceptables.precipitacionmax);
          // console.log('Viento Min Aceptable:', valoresAceptables.vientomin);
          // console.log('Viento Max Aceptable:', valoresAceptables.vientomax);

          if (      
            climaResponse.daily.temperature_2m_min[<number>this.dia] >= preferencia.tempmin &&
            climaResponse.daily.temperature_2m_max[<number>this.dia] <= preferencia.tempmax &&
            climaResponse.daily.precipitation_probability_max[<number>this.dia] >= preferencia.precipitacionmin &&
            climaResponse.daily.precipitation_probability_max[<number>this.dia] <= preferencia.precipitacionmax &&
            climaResponse.daily.wind_speed_10m_max[<number>this.dia] >= preferencia.vientomin &&
            climaResponse.daily.wind_speed_10m_max[<number>this.dia] <= preferencia.vientomax
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

  /**
   * Analiza un conjunto de actividades para verificar su factibilidad.
   * @param {IPreferencia[]} actividades - Lista de actividades a analizar.
   * @returns {Observable<IPreferencia[]>} - Observable que emite las actividades factibles.
  */
  analizarActividades(actividades: IPreferencia[]): Observable<IPreferencia[]> { 
    const observables = actividades.map(actividad => this.esFactible(actividad));

    return forkJoin(observables).pipe(
      map(resultados => {
        const actividadesFactibles: IPreferencia[] = [];
        resultados.forEach((resultado, index) => {
          if (resultado) {
            actividadesFactibles.push(actividades[index]);
          }
        });
        return actividadesFactibles;
      })
    );
  }


  buscarEnMapa(nombreActividad:string): void {
      var iframe = document.getElementById('mapaGoogle');
      location.href = '#mapa';
      let nuevaURL = this.urlBase + "&q=" + nombreActividad + "," + this.ubicacion;
      if (iframe) {
        console.log(iframe.getAttribute('src'));
        iframe.setAttribute('src', nuevaURL);
      }
  }

  inicializarMapaConUbicacion(nombreActividad:string): void {
    var iframe = document.getElementById('mapaGoogle');
    let nuevaURL = this.urlBase + "&q=" + nombreActividad;
    if (iframe) {
      console.log(iframe.getAttribute('src'));
      iframe.setAttribute('src', nuevaURL);
    }
}

  inicializarMapaConLatYLong(lat: number, lon: number) {
    var iframe = document.getElementById('mapaGoogle');
    let nuevaURL = this.urlBase + "&q=" + lat + "," + lon;
    if (iframe) {
      console.log(iframe.getAttribute('src'));
      iframe.setAttribute('src', nuevaURL);
    }
  }

}


