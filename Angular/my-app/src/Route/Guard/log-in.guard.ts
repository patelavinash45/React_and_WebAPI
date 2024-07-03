import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { APICallService } from '../../Services/APICall/apicall.service';
import { Observable, of } from 'rxjs';

export const logInGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const token = localStorage.getItem('jwtToken');
  if (token == null) {
    return of(true);
  }
  const apiCallService = inject(APICallService);
  const router = inject(Router);
  apiCallService.ValidateToken().subscribe(response => {
    router.navigate(['/Food']);
    return of(false);
  });
  return of(true);
};
