import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  actividades = [
    {nombre: 'Pesca', imagen: 'https://media-public.canva.com/89OdA/MAD95E89OdA/1/tl.png' } ,
    {nombre: 'Senderismo', imagen: 'https://media-public.canva.com/mQYyw/MAEWSDmQYyw/1/tl.png' }, 
    {nombre: 'Correr', imagen: 'https://media-public.canva.com/nhCaI/MAEcNYnhCaI/1/tl.png' } ,
    {nombre: 'Golf', imagen: 'https://media-public.canva.com/17QDU/MAEpaH17QDU/1/tl.png'},
    {nombre: 'Camping', imagen: 'https://media-public.canva.com/l3pQo/MAEZBml3pQo/1/tl.png'},
    {nombre: 'Football', imagen: 'https://media-public.canva.com/IpIqA/MAEiSZIpIqA/1/tl.png'}
  ];

  public busqueda = ""

  constructor(){}

  public async ngOnInit() {
    // Selecciona el elemento iframe por su etiqueta
    var iframe = document.querySelector('iframe');

    if (iframe) {
      // Obtiene el valor actual del atributo src
      var srcActual = iframe.getAttribute('src');

      // Concatena la variable al final del valor actual del atributo src
      var nuevoSrc = srcActual + "Hotel";

      // Asigna el nuevo valor del atributo src al iframe
      iframe.setAttribute('src', nuevoSrc);
    }
  }
}
