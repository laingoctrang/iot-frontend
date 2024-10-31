import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) {}

  getLatestDataSensors(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/latest`);
  }

  getRecentDataSensors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recent`);
  }

  getMinMaxDataSenSors(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/min-max`);
  }

  getDustCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/dust-count`);
  }

  controlDevice(device: string, turnOn: boolean): Observable<any> {
    const action = turnOn ? 'on' : 'off';
    return this.http.post(`${this.apiUrl}/control?device=${device}&action=${action}`, {});
  }
}
