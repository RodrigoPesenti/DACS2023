import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap'; 
import { LocationService } from '../core/services/actFutura.service';
declare var google: any;

@Component({
  selector: 'app-actividadesFuturas',
  templateUrl: './actividadesFuturas.component.html',
  styleUrls: ['./actividadesFuturas.component.css']
})

export class ActividadesFuturasComponent implements OnInit {
  fechaActual!: NgbDate; 
  @ViewChild('addresstext') addresstext: ElementRef | undefined;
  fechaSeleccionada: NgbDateStruct | undefined;

  constructor(private calendar: NgbCalendar, private locationService: LocationService) {}

  
  ngOnInit(): void {
    this.fechaActual = this.calendar.getToday();
  }

  actualizarFechaSeleccionada(newDate: NgbDateStruct | null): void {
    if (newDate) {
      this.fechaSeleccionada = newDate;
    }
  }

  calcularFechaMaxima(): NgbDate {
    const fechaMaxima = this.calendar.getNext(this.fechaActual, 'd', 15);
    return fechaMaxima;
  }

  limitarFecha(): boolean {
    if (this.fechaSeleccionada) {
      const diaActual = this.fechaActual.day;
      const diaSeleccionada = this.fechaSeleccionada.day;
      const diferencia = diaSeleccionada - diaActual;

      if (diferencia > 15) {
        // Actualizar el contenido del párrafo
        const alertaElement: HTMLElement | null = document.getElementById('alerta');
        if (alertaElement) {
          alertaElement.innerText = 'La fecha debe ser menor o igual a 16 días superior a la fecha actual';
        }
        console.log('Superior', this.fechaSeleccionada);
        return false;
      }
      else{
        console.log('Actual', diaActual);
        console.log('Seleccion', this.fechaSeleccionada);
      }
    }

    // Restablecer el contenido del párrafo si la diferencia es menor o igual a 16
    const alertaElement: HTMLElement | null = document.getElementById('alerta');
    if (alertaElement) {
      alertaElement.innerText = '';
    }
    return true;
  }

  ngAfterViewInit(): void {
    this.getPlaceAutocomplete();
  }

  getPlaceAutocomplete(): void {
    if (this.addresstext && this.addresstext.nativeElement) {
      const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement, {
        types: ['establishment', 'geocode']
      });

      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        const latitud = place.geometry.location.lat();
        const longitud = place.geometry.location.lng();
        this.locationService.setLatitude(latitud);
        this.locationService.setLongitude(longitud);
        console.log(place.geometry.location.lat());
        console.log(place.geometry.location.lng());
      });
    }
  }

  closeModal(): void {
    const modalFuturo: any = document.querySelector('#modalFuturo');
    modalFuturo.style.display = 'none';
  }
}
