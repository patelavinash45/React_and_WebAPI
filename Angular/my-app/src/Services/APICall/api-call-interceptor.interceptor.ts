import { HttpInterceptorFn, HttpRequest, HttpEvent, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ShowToasterService } from '../show-toaster.service';
import { Router } from '@angular/router';

export const apiCallInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);
  const toaster = inject(ShowToasterService);
  const router = inject(Router)

  if (isBrowser) {
    const token = localStorage.getItem('jwtToken');
    const newRequest = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: token || "",
      },
    });
    return next(newRequest).pipe(
      catchError(errorResponse => {
        toaster.showErrorMessage(errorResponse.error.errorMessage);
        router.navigate(['/LogIn']);
        return throwError(errorResponse);
      })
    );
  } else {
    return next(req);
  }
};