import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Client Management System</span>
      <span style="flex: 1 1 auto;"></span>

      <button mat-button routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{ exact: true }">
        <mat-icon>home</mat-icon>
        Home
      </button>

      <button mat-button routerLink="/clients" routerLinkActive="active-link">
        <mat-icon>groups</mat-icon>
        Clients
      </button>
    </mat-toolbar>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {}
