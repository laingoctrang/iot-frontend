import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionHistoryService {

  private apiUrl = 'http://localhost:8080/api/action-history';

  constructor(private http: HttpClient) { }
  getSearchActionHistory(params: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/?${params}`);
  }
}
