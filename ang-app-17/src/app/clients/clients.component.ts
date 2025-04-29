import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClientsService } from './clients.service'; 
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule,
  ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent {
  clients: any[] = [];
  loading = true;
  error = false;  // <-- NEW: track if there was an error

  constructor(private clientsService: ClientsService, private router: Router) {}

  ngOnInit() {
    console.log('Component loaded!');
    this.loadClients();
  }
  onImageLoad(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.classList.add('loaded');
  }
  
  viewClient(client: any) {
    this.router.navigate(['/client', client.id], { state: { client } });
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
