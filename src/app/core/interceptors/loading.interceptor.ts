import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

import { AppStateService } from '../services/app-state.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const appState = inject(AppStateService);
  appState.startLoading();

  return next(req).pipe(finalize(() => appState.stopLoading()));
};
