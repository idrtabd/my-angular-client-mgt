// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
    // add ClientsComponent to root path, this is a redirect which is great for 
    // starting out , so the actual path is /clients which makes more sense
    {path: '', redirectTo: '/clients', pathMatch: 'full'},
    // add ClientsComponent to /clients path
    {path: 'clients', loadComponent: () => import('./clients/clients.component').then(m => m.ClientsComponent) },
];
