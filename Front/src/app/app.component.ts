import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ApiService } from './core/services/apiservice.service';
import { IClimaResponse, IVersionResponse, IUsuario } from './core/models/response.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dacs2023';
  public isLogueado = false;
  public versionResponse : IVersionResponse  | null = null;
  public perfilUsuario: KeycloakProfile | null = null;
  public usuarioResponse: IUsuario | null = null
  public role = false;
  constructor(private readonly keycloak: KeycloakService,private apiService: ApiService) {}

  public async ngOnInit() {

    this.isLogueado = await this.keycloak.isLoggedIn();
    this.role=await this.keycloak.isUserInRole("ROLE-A");
    this.role=true;
    this.apiService.getVersion().subscribe(resp => {this.versionResponse= resp});
    console.log ("role=====>", this.role );
    if(this.isLogueado && !this.role){
      this.keycloak.logout();
      return;
    }
    type rolesUsuarios = Array<{id: number, text: string}>;

    if (this.isLogueado) {
      this.perfilUsuario = await this.keycloak.loadUserProfile();
      console.log("perfilKey", this.perfilUsuario)
      if (this.perfilUsuario && this.perfilUsuario.username){
        this.apiService.getUsuarioBD(this.perfilUsuario.username).subscribe(resp => 
          {
            this.usuarioResponse = resp; 
            console.log("Usuario:", this.usuarioResponse)
            if (this.usuarioResponse === null && this.perfilUsuario && this.perfilUsuario.username) {
              console.log("Usuario no en BD")
              this.apiService.postUsuarioDB(this.perfilUsuario.username).subscribe(resp => {
                console.log("Usuario agregado a la BD:", resp);
              })
            }

          });

        
      }
      

    }


  }

  message: string = "";

  receiveMessage($event: any) {
    this.message = $event;
    if (this.message === "iniciarSesion") {
      this.keycloak.login();
    }
    else if (this.message === "cerrarSesion") {
      this.keycloak.logout();
    }
  }

 
}
