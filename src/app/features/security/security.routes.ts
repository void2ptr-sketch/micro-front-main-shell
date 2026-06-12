import { Routes } from '@angular/router';

import { ChangePasswordComponent } from './components/change-password/change-password.component';

export const SECURITY_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'change-password',
    pathMatch: 'full',
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    title: 'Смена пароля',
  },
];
