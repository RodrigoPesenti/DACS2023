import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './core/init/keycloak-init.factory';
import { ApiService } from './core/services/apiservice.service';
import { HttpClientModule } from '@angular/common/http';
import { ActividadesComponent } from './actividades/actividades.component';
import { MapaComponent } from './mapa/mapa.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { InicioComponent } from './inicio/inicio.component';
import { PreferenciasComponent } from './preferencias/preferencias.component';
import { FormsModule } from '@angular/forms';
import { ActividadesFuturasComponent } from './actividadesFuturas/actividadesFuturas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ActividadesComponent,
    MapaComponent,
    NavBarComponent,
    InicioComponent,
    PreferenciasComponent,
    ActividadesFuturasComponent
  ],
  imports: [
    BrowserModule,
    KeycloakAngularModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule  
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
