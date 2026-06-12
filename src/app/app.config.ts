import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, RouteReuseStrategy, withRouterConfig } from '@angular/router';

import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { ShellRouteReuseStrategy } from './core/routing/shell-route-reuse.strategy';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),
    { provide: RouteReuseStrategy, useClass: ShellRouteReuseStrategy },
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([loadingInterceptor, authInterceptor, errorInterceptor])),
  ],
};
