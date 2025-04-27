import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-clients',
  imports: [CommonModule, HttpClientModule],   // <-- VERY IMPORTANT: import HttpClientModule
  template: `
    <h2>Clients Page</h2>

    <div *ngIf="clients.length > 0; else noClients">
      <ul>
        <li *ngFor="let client of clients">
          {{ client.name }}
        </li>
      </ul>
    </div>

    <ng-template #noClients>
      <p>No clients found.</p>
    </ng-template>
  `
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
