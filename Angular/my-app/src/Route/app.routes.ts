import { Routes } from '@angular/router';
import { FoodComponent } from '../app/food/food.component';
import { FoodViewComponent } from '../app/food-view/food-view.component';
import { FoodEditComponent } from '../app/food-edit/food-edit.component';
import { FoodAddComponent } from '../app/food-add/food-add.component';
import { LogInComponent } from '../app/log-in/log-in.component';
import { authGuard } from './Guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'LogIn', pathMatch: 'full' },
  {
    path: 'Food',
    component: FoodComponent,
    canActivate: [authGuard],
  },
  {
    path: 'Food',
    canActivateChild: [authGuard],
    children: [
      {
        path: 'View/:foodId',
        component: FoodViewComponent,
      },
      {
        path: 'Edit/:foodId',
        component: FoodEditComponent,
        data: {
          state: 'data',
        },
      },
      {
        path: 'Add',
        component: FoodAddComponent,
      },
    ],
  },
  // {
  //   path: 'Food/View/:foodId',
  //   component: FoodViewComponent,
  // },
  // {
  //   path: 'Food/Edit/:foodId',
  //   component: FoodEditComponent,
  //   data: {
  //     state: 'data',
  //   },
  // },
  // {
  //   path: 'Food/Add',
  //   component: FoodAddComponent,
  // },
  {
    path: 'LogIn',
    component: LogInComponent,
  },
];
