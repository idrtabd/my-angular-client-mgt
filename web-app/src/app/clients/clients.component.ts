import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  standalone: true,
  selector: 'app-clients',
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatListModule
  ],
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/api/clients')
      .subscribe({
        next: (data) => {
          this.clients = data;
        },
        error: (error) => {
          console.error('Error fetching clients', error);
        }
      });
  }
}
