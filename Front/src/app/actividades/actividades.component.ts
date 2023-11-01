import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/apiservice.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import {IPreferencia} from '../core/models/response.interface';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
public isLogueado = false;
public perfilUsuario: KeycloakProfile | null = null;
public preferenciasResponse : IPreferencia[]  | null = null;
//URL acepta Nombre, dirección, código plus o ID de lugar "q=City+Hall,New+York,NY"
private urlBase:string = "https://www.google.com/maps/embed/v1/search?key=AIzaSyBUcr2sITl93oV9QiSycwPieaIGduvrat4&q=";
private ubicacion:string = "Concepción+del+Uruguay"
public actividades: IPreferencia[] = [];

constructor(private readonly keycloak: KeycloakService,private apiService: ApiService) {}

sonidoCard() { 
        var sonido = new Audio('../../assets/sounds/CardSound.mp3');
        sonido.volume = 0.5;
        sonido.play();
}

  

  // actividades = [
  //     {nombre: 'Pesca', imagen: 'https://media-public.canva.com/89OdA/MAD95E89OdA/1/tl.png' } ,
  //     {nombre: 'Senderismo', imagen: 'https://media-public.canva.com/mQYyw/MAEWSDmQYyw/1/tl.png' }, 
  //     {nombre: 'Correr', imagen: 'https://media-public.canva.com/nhCaI/MAEcNYnhCaI/1/tl.png' } ,
  //     {nombre: 'Golf', imagen: 'https://media-public.canva.com/17QDU/MAEpaH17QDU/1/tl.png'},
  //     {nombre: 'Camping', imagen: 'https://media-public.canva.com/l3pQo/MAEZBml3pQo/1/tl.png'},
  //     {nombre: 'Futbol', imagen: 'https://media-public.canva.com/IpIqA/MAEiSZIpIqA/1/tl.png'}
  //   ];

  async ngOnInit() {
    this.actualizarMapa(this.ubicacion);
    this.isLogueado = await this.keycloak.isLoggedIn();

    if (this.isLogueado) {
      this.perfilUsuario = await this.keycloak.loadUserProfile();
    }
    if (this.perfilUsuario && this.perfilUsuario.username) {
      this.apiService.getPreferenciasUsuario("Rodrigo").subscribe(resp => {this.preferenciasResponse = resp});
      console.log(this.preferenciasResponse)
    }

    
  }


  actualizarMapa(cadenaBuscada:string){
    var iframe = document.getElementById('mapaGoogle');

    if (iframe) {
      console.log(iframe.getAttribute('src'));
      var nuevoSrc = this.urlBase + cadenaBuscada;
      iframe.setAttribute('src', nuevoSrc);
    }
  }

  alApretarBoton(nombreBoton:string): void {
    location.href = '#mapa';
    let nuevaURL = nombreBoton + "," + this.ubicacion;
    this.actualizarMapa(nuevaURL);
  }

}


