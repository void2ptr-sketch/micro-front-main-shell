import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

type CloudberryRemoteModule = {
  REMOTE_ROUTES: Routes;
};

const cloudberryFallbackRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./cloudberry-load-error.component').then((m) => m.CloudberryLoadErrorComponent),
    title: 'Cloudberry недоступен',
  },
];

export const loadCloudberryRoutes = (): Promise<Routes> =>
  loadRemoteModule('cloudberry', './routes')
    .then((module) => {
      const remote = module as CloudberryRemoteModule;

      if (!remote.REMOTE_ROUTES) {
        throw new Error('Cloudberry remote: export REMOTE_ROUTES not found');
      }

      return remote.REMOTE_ROUTES;
    })
    .catch((error: unknown) => {
      console.error('[cloudberry] Failed to load remote routes', error);
      return cloudberryFallbackRoutes;
    });
