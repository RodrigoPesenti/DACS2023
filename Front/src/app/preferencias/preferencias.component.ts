import { ApiService } from './../core/services/apiservice.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Observable, finalize, forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.component.html',
  styleUrls: ['./preferencias.component.css']
})
export class PreferenciasComponent {
  pesca = false
  public perfilUsuario: KeycloakProfile | null = null;
  public isLogueado = false;
  activities: { name: string, selected: boolean }[] = [];
  estadoInicial: { name: string, selected: boolean }[] = [];
  public desactivarBotonGuardar: boolean = false;

  constructor(private readonly keycloak: KeycloakService, private apiService: ApiService) { }

  async ngOnInit() {
    this.isLogueado = await this.keycloak.isLoggedIn();
    if (this.isLogueado) {
      this.perfilUsuario = await this.keycloak.loadUserProfile();
      let nombreUsuario = <string>this.perfilUsuario.username;

      this.apiService.getActividades().subscribe((listaActividades) => {
        this.apiService.getPreferenciasUsuario(nombreUsuario).subscribe((listaPreferencias) => {

          listaActividades.forEach((actividad) => {
            const matchingPreferencia = listaPreferencias.find(preferencia => preferencia.nombre === actividad.nombre);
            if (matchingPreferencia) {
              this.activities.push({ name: actividad.nombre, selected: true })
            } else {
              this.activities.push({ name: actividad.nombre, selected: false })
            }
            

          })    
          this.estadoInicial = JSON.parse(JSON.stringify(this.activities));
        })
      });
    }
    else {
      console.log("El usuario no esta logeado")
    };
  }

  refreshPage() {
    location.reload();
  }

  saveActivities() {
    console.log('Actividades seleccionadas:', this.activities.filter(activity => activity.selected));
  }

  closeModal() {
    const modal: any = document.querySelector('.modal');
    modal.style.display = 'none';
    this.activities = JSON.parse(JSON.stringify(this.estadoInicial));
  }

  activitiesToDelete(activities: { name: string, selected: boolean }[], nombreUsuario: string): Observable<{ activitiesDelete: { name: string; selected: boolean; }[]; activitiesAdd: { name: string; selected: boolean; }[]; }> {
    return this.apiService.getPreferenciasUsuario(nombreUsuario).pipe(map((listaPreferencias) => {
      const activitiesDelete: { name: string, selected: boolean }[] = [];
      const activitiesAdd: { name: string, selected: boolean }[] = [];

      activities.forEach((activitie) => {
        const existentPreference = listaPreferencias.find(preferencia => preferencia.nombre === activitie.name);
        if (existentPreference && !activitie.selected) {
          activitiesDelete.push(activitie);
        }
        else if (!existentPreference && activitie.selected) {
          activitiesAdd.push(activitie);
        }
      });
      return { activitiesDelete, activitiesAdd };
    })
    );
  }

  updatePreferences() {
    if (this.isLogueado && this.perfilUsuario) {
      this.desactivarBotonGuardar = true;
      let nombreUsuario = <string>this.perfilUsuario.username;

      this.activitiesToDelete(this.activities, nombreUsuario).subscribe(
        ({ activitiesDelete, activitiesAdd }) => {
          console.log('Actividades a eliminar:', activitiesDelete);

          const deleteRequests = activitiesDelete.map((activitie) =>
            this.apiService.deleteUsuarioActividad(nombreUsuario, activitie.name)
          );

          const addRequests = activitiesAdd.map((activitie) =>
            this.apiService.postUsuarioActividad(nombreUsuario, activitie.name)
          );

          // forkJoin para esperar a todas las operaciones asincronas
          const allRequests = forkJoin([...deleteRequests, ...addRequests]);

          allRequests.pipe(finalize(() => { this.refreshPage(); })).subscribe(
            (responses) => {
              console.log('Responses:', responses);
            },
            (error) => {
              console.error('Error al obtener actividades a eliminar:', error);
            });
        },
        (error) => {
          console.error('Error al obtener actividades a eliminar:', error);
        }
      );
    }
    console.log('Actividades seleccionadas:', this.activities.filter(activity => activity.selected));
  }

}
