// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

// AGREGAMOS 'withFetch' AQUÍ
import { provideHttpClient, withFetch } from '@angular/common/http'; 

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module'; 

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    
    // USAMOS 'withFetch' AQUÍ
    provideHttpClient(withFetch()),       
    
    provideRouter(routes),
  ]
})
  .catch(err => console.error(err));