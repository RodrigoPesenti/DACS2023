import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

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
