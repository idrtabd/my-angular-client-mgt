import {
  bootstrapApplication,
  provideClientHydration,
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideHttpClient(),
    provideClientHydration(),
    provideAnimations(),                       // ✅ Real animations, NOT Noop
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' }, // ✅ Locale
  ],
}).catch((err) => console.error(err));
