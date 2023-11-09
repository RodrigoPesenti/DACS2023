import { ApiService } from './../core/services/apiservice.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.component.html',
  styleUrls: ['./preferencias.component.css']
})
export class PreferenciasComponent {
  pesca=false
  public perfilUsuario: KeycloakProfile | null = null;
  public isLogueado = false;
  activities: { name: string, selected: boolean }[] = [];

  constructor(private readonly keycloak: KeycloakService,private apiService: ApiService) {}

  async ngOnInit(){
    this.isLogueado = await this.keycloak.isLoggedIn();

    if (this.isLogueado) {
      this.perfilUsuario = await this.keycloak.loadUserProfile();
      let nombreUsuario = <string> this.perfilUsuario.username;
      let listaActividadesExistentes = this.apiService.getActividades().subscribe(
        (listaActividades)=>{
          let listaPreferencias = this.apiService.getPreferenciasUsuario(nombreUsuario).subscribe(
            (listaPreferencias)=>{
        
              //Agrego a la lista con las actividades existentes
              listaActividades.forEach(
                (actividad) => {
                  const matchingPreferencia = listaPreferencias.find(preferencia => preferencia.nombre === actividad.nombre);
                  if (matchingPreferencia) {
                    this.activities.push({name: actividad.nombre, selected:true})
                  } else{
                    this.activities.push({name: actividad.nombre, selected:false})
                  }
                }
              )
            }
          )
        }
      );

    }
    else {
        console.log("El usuario no esta logeado")
      };
  }

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
