import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private localStorageKey = 'locationData';

  public latitude: number | null = null;
  public longitude: number | null = null;
  public adress: string | null = null;
  public dia: number | null = null;

  constructor() {
    // Recuperar datos del almacenamiento local al inicializar el servicio
    const storedData = localStorage.getItem(this.localStorageKey);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.latitude = parsedData.latitude;
      this.longitude = parsedData.longitude;
      this.adress = parsedData.adress;
      this.dia = parsedData.dia;
    }
  }

  setLatitude(latitude: number) {
    this.latitude = latitude;
    this.saveToLocalStorage();
  }

  getLatitude(): number | null {
    return this.latitude;
  }

  setLongitude(longitude: number) {
    this.longitude = longitude;
    this.saveToLocalStorage();
  }

  getLongitude(): number | null {
    return this.longitude;
  }

  setAdress(adress: string) {
    this.adress = adress;
    this.saveToLocalStorage();
  }

  getAdress(): string | null {
    return this.adress;
  }

  setDia(dia: number) {
    this.dia = dia;
    this.saveToLocalStorage();
  }

  getDia(): number | null {
    return this.dia;
  }

  private saveToLocalStorage() {
    const dataToStore = {
      latitude: this.latitude,
      longitude: this.longitude,
      adress: this.adress,
      dia: this.dia
    };
    localStorage.setItem(this.localStorageKey, JSON.stringify(dataToStore));
  }
}
