import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-appointment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './add-appointment-dialog.component.html',
  styleUrls: ['./add-appointment-dialog.component.scss'],
})
export class AddAppointmentDialogComponent implements AfterViewInit {
  @ViewChild('reasonInput') reasonInput!: ElementRef<HTMLInputElement>;

  appointmentDateString: string = '';
  startTime: string = '';
  endTime: string = '';

  newAppointment = {
    reason: 'Meeting with client',
    status: 'Scheduled',
    notes: '',
  };

  constructor(private dialogRef: MatDialogRef<AddAppointmentDialogComponent>) {
    const now = new Date();

    // Set today as default date
    this.appointmentDateString = now.toISOString().split('T')[0]; // "YYYY-MM-DD"

    // Round time to nearest next half hour
    const minutes = now.getMinutes();
    const roundedMinutes = minutes <= 30 ? 30 : 0;
    const hours = minutes > 30 ? now.getHours() + 1 : now.getHours();

    this.startTime = `${hours.toString().padStart(2, '0')}:${roundedMinutes.toString().padStart(2, '0')}`;

    // End time = +30 minutes after start time
    const end = new Date(now);
    end.setHours(hours);
    end.setMinutes(roundedMinutes + 30);
    this.endTime = `${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.reasonInput?.nativeElement?.focus();
    }, 100);
  }

  save() {
    if (!this.newAppointment.reason || !this.appointmentDateString || !this.startTime || !this.endTime) {
      alert('Please fill out Reason, Date, Start Time, and End Time.');
      return;
    }

    const startDate = new Date(`${this.appointmentDateString}T${this.startTime}`);
    const endDate = new Date(`${this.appointmentDateString}T${this.endTime}`);

    if (endDate <= startDate) {
      alert('End Time must be after Start Time.');
      return;
    }

    const finalAppointment = {
      ...this.newAppointment,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    this.dialogRef.close(finalAppointment);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
