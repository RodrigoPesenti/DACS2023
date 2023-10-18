import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ApiService } from './core/services/apiservice.service';
import { IClimaResponse, IVersionResponse } from './core/models/response.interface';

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
  public role = false;
  constructor(private readonly keycloak: KeycloakService,private apiService: ApiService) {}

  public async ngOnInit() {

    this.isLogueado = await this.keycloak.isLoggedIn();
    this.role=await this.keycloak.isUserInRole("ROLE-A");
    this.apiService.getVersion().subscribe(resp => {this.versionResponse= resp});
    console.log ("role=====>", this.role );
    if(this.isLogueado && !this.role){
      this.keycloak.logout();
      return;
    }
    type rolesUsuarios = Array<{id: number, text: string}>;

    if (this.isLogueado) {
      this.perfilUsuario = await this.keycloak.loadUserProfile();
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