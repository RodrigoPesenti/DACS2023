import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { IRequestTest } from '../models/request.interface';
import { catchError, map, switchMap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

interface Coordinates {
    latitude: number;
    longitude: number;
  }

import { IResponse, IClimaResponse, IVersionResponse, IPreferencia, IUsuario, IUsuarioActividad } from '../models/response.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {

    }

    getPing() {
        const url = `${environment.backendForFrontendUrl}/ping`;
        return this.http
            .get(url, { responseType: 'text' })
            .pipe();
    }

    getUsuarioBD(nombreUsuario: string) {
        const url = `http://localhost:9001/bff/usuario/nombre/${nombreUsuario}`;
        return this.http
          .get<IUsuario>(url, this.headers)
          .pipe();
      }
    
    getActividades() {
      const url = `http://localhost:9001/bff/actividad`;
      return this.http
          .get<IPreferencia[]>(url, this.headers)
          .pipe();
    }

    //DeleteUsuarioActividades(nombreUsuario: string, listPreferencias: IPreferencias[])
    //postUsuarioActividades(nombreUsuario: string, listPreferencias: IPreferencias[])

    getPreferenciasUsuario(nombreUsuario: string){
        const url =`http://localhost:9001/bff/usuario/nombre/${nombreUsuario}/preferencias`;
        return this.http
            .get<IPreferencia[]>(url, this.headers)
            .pipe(
              switchMap((preferencias) => {
                if (preferencias && preferencias.length > 0) {
                  // La lista de preferencias no está vacía
                  return of(preferencias);
                } else {
                  // La lista de preferencias está vacía
                  const urlactividades = 'http://localhost:9001/bff/actividad';
                  return this.http
                    .get<IPreferencia[]>(urlactividades, this.headers)
                    .pipe();
                }
              })
            );
    }

    getClima(lat: number, lon: number){
        const url =`http://localhost:9001/bff/clima/${lat}/${lon}`;
        return this.http
            .get<IClimaResponse>(url, this.headers)
            .pipe();
    }

    getLocation(): Promise<Coordinates> {
        return new Promise((resolve, reject) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const coordinates: Coordinates = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                };
                resolve(coordinates);
              },
              (error) => {
                reject(error);
              }
            );
          } else {
            reject(new Error('Geolocation is not supported.'));
          }
        });
      }

    getVersion() {
        const url ='assets/json/version.json';
        return this.http
            .get<IVersionResponse>(url, this.headers)
            .pipe();
    }

    postTest(param: IRequestTest) { 
        const url = `${environment.backendForFrontendUrl}/test`;
        return this.http.post<any[]>(url, param, this.headers);
    }

    postUsuarioDB(nombreUsuario: string) {
        const url = `http://localhost:9001/bff/usuario`;

        const body = {
            nombre: nombreUsuario
        };

        return this.http
            .post<IUsuario>(url, body, this.headers)
            .pipe();
    }

    postUsuarioActividad(nombreUsuario: string, nombreActividad: string) {
        const url = `http://localhost:9001/bff/usuario/usuarioActividad/${nombreUsuario}/${nombreActividad}`;

        return this.http
            .post<IUsuarioActividad>(url, this.headers)
            .pipe();
    }

    deleteUsuarioActividad(nombreUsuario: string, nombreActividad: string){
        const url =  `http://localhost:9001/bff/usuario/usuarioActividad/${nombreUsuario}/${nombreActividad}`;

        return this.http
            .delete<string>(url, this.headers)
            .pipe();
    }

    get headers() {
        return {
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }

}




