import { HttpInterceptorFn } from '@angular/common/http';

const AUTH_TOKEN_KEY = 'auth_token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem(AUTH_TOKEN_KEY);

  if (!token) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
};
