import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '../Route/app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiCallInterceptor } from '../Services/APICall/api-call-interceptor.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([apiCallInterceptor])),
    provideAnimations(),
    provideToastr({
      progressBar: true,
      timeOut: 3000,
      closeButton: true
    }),
  ],
};
