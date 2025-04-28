import { Component } from '@angular/core';
// import common modules
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent {
  loading = true;

  // ngInit function to set timeout and spinner for loading, simulates a loading delay
  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  clients = [
    { name: 'Client One' },
    { name: 'Client Two' },
    { name: 'Client Three' }
  ];


  // function to toggleDarkMode
  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }


}
