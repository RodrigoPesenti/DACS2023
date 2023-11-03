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
    { name: 'Correr', selected: false },
    { name: 'Pesca', selected: false },
    { name: 'Senderismo', selected: false }
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
