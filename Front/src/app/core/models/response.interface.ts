import { Timestamp } from "rxjs";

export interface IResponse
    {
        error : boolean ;
        errorCode: string;
        errorDescription: string;
        data: any;
    }

    export interface IVersionResponse
    {
        version: string;
    }

    export interface IUsuario {
        id: number;
        nombre: string;
    }

    export interface IPreferencia {
        id: number;
        nombre: string;
        tempmin: number;
        tempmax: number;
        vientomin: number;
        vientomax: number;
        precipitacionmin: number;
        precipitacionmax: number;
    }

    export interface IClimaResponse{       
        daily:{
            precipitation_sum: number[];
            temperature_2m_max: number[];
            temperature_2m_min: number[];
            wind_speed_10m_max: number[];
            time: string[]
        }
    }