import { Routes } from '@angular/router';
import { ViewFoodItemComponent } from './view-food-item/view-food-item.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', redirectTo: 'FoodItems', pathMatch: 'full' },
  {
    path: 'FoodItems',
    component: AppComponent,
  },
  {
    path: 'FoodItem/:foodId',
    component: ViewFoodItemComponent,
  },
];
