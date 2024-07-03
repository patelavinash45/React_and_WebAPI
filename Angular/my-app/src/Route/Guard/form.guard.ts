import { CanDeactivateFn } from '@angular/router';

export const formGuard: CanDeactivateFn<unknown> = (component: any, currentRoute, currentState, nextState) => {
  console.log(component.form.dirty);
  if (component.form.touched) {
    return confirm('You have some unsaved Details. Are You want to back ??');
  }
  return true;
};
