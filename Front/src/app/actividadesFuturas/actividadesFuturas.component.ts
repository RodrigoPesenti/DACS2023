import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
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
  private latitud: number = 0;
  private longitud: number = 0;
  private adress: string = "";

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

  getCantidadDias(fechaFin: NgbDateStruct): number | undefined {
    const fechaActual = new Date(); // Obtener la fecha actual del sistema
  
    if (!fechaFin) {
      return undefined; // Si la fecha de fin no está definida, retornar undefined
    }
  
    const inicio = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());
    const fin = new Date(fechaFin.year, fechaFin.month - 1, fechaFin.day);
  
    const diferenciaTiempo = fin.getTime() - inicio.getTime();
    const diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
  
    return Math.abs(Math.round(diferenciaDias)); // Devolver la cantidad de días como un número positivo
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
        this.adress = place.formatted_address;
        this.latitud = place.geometry.location.lat();
        this.longitud = place.geometry.location.lng();
      });
    }
  }

  closeModal(): void {
    const modalFuturo: any = document.querySelector('#modalFuturo');
    modalFuturo.style.display = 'none';
  }

  confirmarSeleccion(): void {
    this.locationService.setLatitude(this.latitud);
    this.locationService.setLongitude(this.longitud);
    this.locationService.setAdress(this.adress)
    if (this.fechaSeleccionada){
      this.locationService.setDia(<number>this.getCantidadDias(this.fechaSeleccionada))
    }
    console.log(this.locationService.getLatitude());
    console.log(this.locationService.getLongitude());
    console.log(this.locationService.getAdress())
    console.log(this.locationService.getDia())
    location.reload();
  }
}
