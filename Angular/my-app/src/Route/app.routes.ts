import { Routes } from '@angular/router';
import { FoodComponent } from '../app/food/food.component';
import { FoodViewComponent } from '../app/food-view/food-view.component';
import { FoodEditComponent } from '../app/food-edit/food-edit.component';
import { FoodAddComponent } from '../app/food-add/food-add.component';
import { LogInComponent } from '../app/log-in/log-in.component';
import { authGuard } from './Guard/auth.guard';
import { formGuard } from './Guard/form.guard';
import { logInGuard } from './Guard/log-in.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'LogIn', pathMatch: 'full' },
  {
    path: 'Food',
    component: FoodComponent,
    canActivate: [authGuard],
    title: 'Food'
  },
  {
    path: 'Food',
    canActivateChild: [authGuard],
    children: [
      {
        path: 'View/:foodId',
        component: FoodViewComponent,
        title: 'View Food'
      },
      {
        path: 'Edit/:foodId',
        component: FoodEditComponent,
        title: 'Edit Food',
        data: {
          state: 'data',
        },
      },
      {
        path: 'Add',
        component: FoodAddComponent,
        title: 'Add Food',
      },
    ],
  },
  {
    path: 'LogIn',
    component: LogInComponent,
    canActivate: [logInGuard]
  },
  {
    path: '**',
    redirectTo: 'LogIn',
  }
];
