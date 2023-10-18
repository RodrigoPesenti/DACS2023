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

    export interface IClimaResponse
    {
        clima: string;
    }