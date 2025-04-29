import { Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { HomeComponent } from './home.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';

// add the ClientsComponent to root path
export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'clients', component: ClientsComponent},
    // client detail route
    {path: 'client/:id', component: ClientDetailComponent}
];
