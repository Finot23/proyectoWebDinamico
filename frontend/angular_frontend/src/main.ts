// src/main.ts (Para usar Standalone)

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; 
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';


import { routes } from './app/app-routing.module'; 


bootstrapApplication(AppComponent, {
  providers: [
   
    provideAnimations(),       // Por BrowserAnimationsModule
    provideHttpClient(),       // Por HttpClientModule
    provideRouter(routes),     // Por AppRoutingModule
    
   
  ]
})
  .catch(err => console.error(err));




/*
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
*/