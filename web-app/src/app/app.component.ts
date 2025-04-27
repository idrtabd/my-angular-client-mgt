// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  standalone: true,
  template: `
    <h1>Welcome to {{title}}!</h1>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'web-app';
}
