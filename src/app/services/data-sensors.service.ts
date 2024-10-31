import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSensorsService {
  private apiUrl = 'http://localhost:8080/api/data-sensors';

  constructor(private http: HttpClient) { }

  // getDataSensors(page: number, size: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/?page=${page}&size=${size}`);
  // }

  // getSortDataSensors(sortBy: string, sortDir: string, page: number, size: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/sort?sortBy=${sortBy}&sortDir=${sortDir}&page=${page}&size=${size}`);
  // }

  getSearchDataSensors(params: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/?${params}`);
  }

  getSearchDataSensors2(params: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/2/?${params}`);
  }
}
