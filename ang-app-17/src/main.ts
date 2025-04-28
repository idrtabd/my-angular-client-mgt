import {
  bootstrapApplication,
  provideClientHydration,
} from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// http client
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideHttpClient(),
    provideClientHydration(),
  ],
}).catch((err) => console.error(err));
