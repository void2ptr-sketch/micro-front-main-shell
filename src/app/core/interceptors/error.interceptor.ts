import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { AppStateService } from '../services/app-state.service';

const resolveErrorMessage = (error: HttpErrorResponse): string => {
  if (typeof error.error === 'object' && error.error !== null && 'message' in error.error) {
    return String((error.error as { message: string }).message);
  }

  if (error.status === 0) {
    return 'Сервер недоступен. Проверьте подключение к сети.';
  }

  return error.message || 'Произошла ошибка при выполнении запроса.';
};

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const appState = inject(AppStateService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      appState.setError(resolveErrorMessage(error));
      return throwError(() => error);
    }),
  );
};
