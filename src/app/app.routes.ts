import { Routes } from '@angular/router';

import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { loadCloudberryRoutes } from './features/cloudberry/load-cloudberry.routes';
import { loadPersonalProfileRoutes } from './features/personal-profile/load-personal-profile.routes';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Главная',
      },
      {
        path: 'cloudberry',
        loadChildren: loadCloudberryRoutes,
      },
      {
        path: 'profile',
        loadChildren: loadPersonalProfileRoutes,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
