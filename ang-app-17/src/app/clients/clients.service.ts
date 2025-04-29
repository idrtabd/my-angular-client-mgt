import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  getClients(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/clients');
  }

  addAppointment(clientId: number, appointment: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/api/appointments/${clientId}`, appointment);
  }

  getAppointments(clientId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/appointments/client/${clientId}`);
  }
  
  deleteAppointment(appointmentId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/appointments/${appointmentId}`);
  }

}
