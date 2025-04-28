import { Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { HomeComponent } from './home.component';

// add the ClientsComponent to root path
export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'clients', component: ClientsComponent}
];
