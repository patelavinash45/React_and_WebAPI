import { HttpInterceptorFn, HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const apiCallInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  if (isBrowser) {
    const token = localStorage.getItem('jwtToken');
    const newRequest = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: token || "",
      },
    });
    return next(newRequest).pipe(
      tap((event: HttpEvent<any>) => {
      })
    );
  } else {
    return next(req);
  }
};