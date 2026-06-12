import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

type CloudberryRemoteModule = {
  REMOTE_ROUTES: Routes;
};

export const loadCloudberryRoutes = (): Promise<Routes> =>
  loadRemoteModule('cloudberry', './routes').then((module) => {
    const remote = module as CloudberryRemoteModule;
    return remote.REMOTE_ROUTES;
  });
