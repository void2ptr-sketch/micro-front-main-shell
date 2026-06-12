import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

type PersonalProfileRemoteModule = {
  REMOTE_ROUTES: Routes;
};

const personalProfileFallbackRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./personal-profile-load-error.component').then(
        (m) => m.PersonalProfileLoadErrorComponent,
      ),
    title: 'Personal Profile недоступен',
  },
];

export const loadPersonalProfileRoutes = (): Promise<Routes> =>
  loadRemoteModule('personal-profile', './routes')
    .then((module) => {
      const remote = module as PersonalProfileRemoteModule;

      if (!remote.REMOTE_ROUTES) {
        throw new Error('Personal Profile remote: export REMOTE_ROUTES not found');
      }

      return remote.REMOTE_ROUTES;
    })
    .catch((error: unknown) => {
      console.error('[personal-profile] Failed to load remote routes', error);
      return personalProfileFallbackRoutes;
    });
