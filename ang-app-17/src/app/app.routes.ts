import { Client } from './../../../web-app/node_modules/undici-types/client.d';
import { Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';

// add the ClientsComponent to root path
export const routes: Routes = [
    {path: '', component: ClientsComponent}
];
