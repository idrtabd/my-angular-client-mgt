import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
// Material UI Imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddAppointmentDialogComponent } from '../../client-detail/add-appointment-dialog/add-appointment-dialog.component';
import { ClientsService } from '../clients.service';
import { firstValueFrom } from 'rxjs'; // <-- import this at the top

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent {
  clientId: string | null = null;
  client: any;

  appointments: any[] = []; // Initialize appointments as an empty array


  constructor(
    private route: ActivatedRoute
    ,private dialog: MatDialog
    ,private clientsService: ClientsService
  ) {}

  ngOnInit() {
    this.clientId = this.route.snapshot.paramMap.get('id');
    const nav = window.history.state;
    this.client = nav.client;

    if (!this.client) {
      console.error('No client data found!');
      // Optionally redirect back to /clients
    }

    // load appointments
    this.loadAppointments();

    console.log('Loaded client:', this.client);
  }

  deleteAppointment(appointmentId: number) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.clientsService.deleteAppointment(appointmentId).subscribe({
        next: () => {
          this.appointments = this.appointments.filter((appointment) => appointment.id !== appointmentId);
          console.log('Appointment deleted:', appointmentId);
        },
        error: (err) => {
          console.error('Failed to delete appointment:', err);
        }
      });
    }
  }

  loadAppointments() {
    if (!this.clientId) return;
  
    // parse clientId to number
    const parsedClientId = Number(this.clientId);
    if (isNaN(parsedClientId)) {
      console.error('Invalid client ID:', this.clientId);
      return;
    }
    this.clientsService.getAppointments(parsedClientId).subscribe({
      next: (appointments) => {
        this.appointments = appointments;
      },
      error: (err) => {
        console.error('Failed to load appointments', err);
        this.appointments = [];
      }
    });
  }

  addingAppointment = false;

  newAppointment = {
    reason: '',
    startDate: '',
    endDate: '',
    status: 'Scheduled',
    notes: '',
  };


  async openAddAppointment() {
    const dialogRef = this.dialog.open(AddAppointmentDialogComponent, {
      width: '400px',
    });
  
    const result = await firstValueFrom(dialogRef.afterClosed());
  
    if (result) {
      const newAppointment = { ...result, clientId: this.clientId };
  
      // convert clientId to number
      if (this.clientId) {
        newAppointment.clientId = Number(this.clientId);
      } else {
        console.error('Client ID is not available');
        return;
      }

      try {
        const response = await firstValueFrom(this.clientsService.addAppointment(newAppointment.clientId, newAppointment));
        console.log('Appointment created with ID:', response.id);
  
        this.appointments.push({
          ...newAppointment,
          id: response.id,
        });
      } catch (err) {
        console.error('Failed to create appointment:', err);
        alert('Failed to create appointment.');
      }
    }
  }


  

  cancelAddAppointment() {
    this.addingAppointment = false;
    this.newAppointment = {
      reason: '',
      startDate: '',
      endDate: '',
      status: 'Scheduled',
      notes: '',
    };
  }

  async saveNewAppointment() {
    // Simple push locally first:
    this.appointments.push({ ...this.newAppointment });

    // Reset form
    this.cancelAddAppointment();

    // (Later) Call database API to save
    console.log('Appointment saved:', this.newAppointment);
  }
}
