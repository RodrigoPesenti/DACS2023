import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public latitude: number | null  = null;
  public longitude: number | null  = null;

  constructor() { }

  setLatitude(latitude: number) {
    this.latitude = latitude;
  }

  getLatitude(): number | null {
    return this.latitude;
  }

  setLongitude(longitude: number) {
    this.longitude = longitude;
  }

  getLongitude(): number | null {
    return this.longitude;
  }
}
