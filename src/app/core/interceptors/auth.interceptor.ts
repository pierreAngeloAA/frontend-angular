import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

// Login and logout answer 401 as part of their normal flow (wrong password,
// expired token). Reacting to those with another logout would loop forever.
const isAuthCall = (url: string) => /\/(login|logout)$/.test(url);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token && !req.url.endsWith('/login')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401 && !isAuthCall(req.url)) {
        // logout() clears the session and navigates to /login.
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
