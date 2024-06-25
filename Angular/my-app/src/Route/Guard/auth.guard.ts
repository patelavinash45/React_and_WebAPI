import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('jwtToken');
  if (token != null) {
    return true;
  }
  else {
    router.navigate(['/LogIn']);
    return false;
  }
};
