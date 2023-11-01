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

    export interface IClimaResponse
    {
        clima: string;
    }