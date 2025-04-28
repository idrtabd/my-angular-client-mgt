import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClientsService } from './clients.service';  // reimport service
import { timer } from 'rxjs';  // <-- NEW import

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent {
  clients: any[] = [];
  loading = true;
  error = false;  // <-- NEW: track if there was an error

  constructor(private clientsService: ClientsService) {}

  ngOnInit() {
    console.log('Component loaded!');
    this.loadClients();
  }

  loadClients() {
    this.loading = true;
    this.error = false;  // reset error state before loading
    this.clientsService.getClients().subscribe({
      next: (clients) => {
        this.clients = clients;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load clients', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }
}
