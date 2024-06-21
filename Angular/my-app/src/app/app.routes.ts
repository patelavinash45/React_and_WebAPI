import { Routes } from '@angular/router';
import { FoodComponent } from './food/food.component';
import { FoodViewComponent } from './food-view/food-view.component';
import { FoodEditComponent } from './food-edit/food-edit.component';
import { FoodAddComponent } from './food-add/food-add.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Food', pathMatch: 'full' },
  {
    path: 'Food',
    component: FoodComponent,
  },
  {
    path: 'Food/View/:foodId',
    component: FoodViewComponent,
  },
  {
    path: 'Food/Edit/:foodId',
    component: FoodEditComponent,
    data: {
      state: 'some-state-data',
    },
  },
  {
    path: 'Food/Add',
    component: FoodAddComponent,
  },
];
