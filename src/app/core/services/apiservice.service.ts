import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { IRequestTest } from '../models/request.interface';

import { IResponse, IClimaResponse, IVersionResponse } from '../models/response.interface';

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




