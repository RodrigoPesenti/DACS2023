import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { IRequestTest } from '../models/request.interface';
import { catchError, map } from 'rxjs/operators';
import { throwError, of } from 'rxjs';





import { IResponse, IClimaResponse, IVersionResponse, IPreferencia, IUsuario } from '../models/response.interface';

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
        const url = `http://localhost:9003/backend/usuario/nombre/${nombreUsuario}`;
        return this.http
          .get<IUsuario>(url, this.headers)
          .pipe(
            catchError((error: any) => {
              if (error.status === 404) {
                // Si el error es un HTTP 404, significa que el usuario no se encontró
                return of(null); // Devuelve un observable que emite un valor nulo
              } else {
                // Otros errores de solicitud HTTP
                console.error('Error en la solicitud HTTP:', error);
                return throwError(error);
              }
            })
          );
      }
       
    postUsuarioDB(nombreUsuario: string) {
        const url = `http://localhost:9003/backend/usuario`;

        const body = {
            nombre: nombreUsuario
        };

        return this.http
            .post<IUsuario>(url, body, this.headers)
            .pipe();
    }

    getPreferenciasUsuario(nombreUsuario: string){
        const url =`http://localhost:9003/backend/usuario/nombre/${nombreUsuario}/preferencias`;
        return this.http
            .get<IPreferencia[]>(url, this.headers)
            .pipe(
                catchError((error: any) => {
                  if (error.status === 404) {
                    // Si el error es un HTTP 404, significa que el usuario no tiene preferencias
                    return of([]); // Devolver todas las actividades
                  } else {
                    // Otros errores de solicitud HTTP
                    console.error('Error en la solicitud HTTP:', error);
                    return throwError(error);
                  }
                })
              );
    }

    getClima(){
        const url ='assets/json/clima.json';
        return this.http
            .get<IClimaResponse>(url, this.headers)
            .pipe();
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

    get headers() {
        return {
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }

}




