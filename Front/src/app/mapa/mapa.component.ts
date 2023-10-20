import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  //URL acepta Nombre, dirección, código plus o ID de lugar "q=City+Hall,New+York,NY"
  private urlBase:string = "https://www.google.com/maps/embed/v1/search?key=AIzaSyBUcr2sITl93oV9QiSycwPieaIGduvrat4&q=";
  private ubicacion:string = "Concepción+del+Uruguay"

  actividades = [
    {nombre: 'Pesca', imagen: 'https://media-public.canva.com/89OdA/MAD95E89OdA/1/tl.png' } ,
    {nombre: 'Senderismo', imagen: 'https://media-public.canva.com/mQYyw/MAEWSDmQYyw/1/tl.png' }, 
    {nombre: 'Correr', imagen: 'https://media-public.canva.com/nhCaI/MAEcNYnhCaI/1/tl.png' } ,
    {nombre: 'Golf', imagen: 'https://media-public.canva.com/17QDU/MAEpaH17QDU/1/tl.png'},
    {nombre: 'Camping', imagen: 'https://media-public.canva.com/l3pQo/MAEZBml3pQo/1/tl.png'},
    {nombre: 'Football', imagen: 'https://media-public.canva.com/IpIqA/MAEiSZIpIqA/1/tl.png'}
  ];

  constructor(){}

  async ngOnInit() {
    this.actualizarMapa(this.ubicacion);
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
