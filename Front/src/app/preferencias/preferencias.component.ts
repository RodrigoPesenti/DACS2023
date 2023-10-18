import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.component.html',
  styleUrls: ['./preferencias.component.css']
})
export class PreferenciasComponent {
  pesca=false

  activities = [
    { name: 'Actividad 1', selected: false },
    { name: 'Actividad 2', selected: false },
    { name: 'Actividad 3', selected: false }
  ];

  saveActivities() {
    console.log('Actividades seleccionadas:', this.activities.filter(activity => activity.selected));
  }

  closeModal() {
    const modal: any = document.querySelector('.modal'); 
      modal.style.display = 'none';   
  }

  updatePreferences() {
    console.log('Actividades seleccionadas:', this.activities.filter(activity => activity.selected));
  }

}
