import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideCharts } from 'ng2-charts'; // <-- Thêm dòng này
import { PieController, ArcElement, Title, Tooltip } from 'chart.js';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideCharts({ 
      registerables: [PieController, ArcElement, Title, Tooltip] 
    })
  ]
};
