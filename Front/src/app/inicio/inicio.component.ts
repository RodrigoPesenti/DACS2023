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
    this.apiService.getClima().subscribe(resp => {this.climaResponse= resp});
  }
  

  obtenerImagenClima() {
    // Aquí debería implementarse la lógica para obtener la imagen del clima.
    // Devuelve la URL de la imagen.
    return this.climaImagenURL = "../../assets/images/Soleado.png";
  }

}
