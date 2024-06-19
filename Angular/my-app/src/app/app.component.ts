import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FoodItem } from '../Interfaces/food-item';
import { HttpClientModule } from '@angular/common/http';
import { APICallService } from '../APICall/apicall.service';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    HttpClientModule,
    RouterModule,
  ],
})
export class AppComponent {
  foodItems: FoodItem[] = [];
  constructor(public apiCallService: APICallService) {}

  ngOnInit(): void {
    this.apiCallService.GetAll().subscribe((data) => {
      this.foodItems = data.result;
    });
  }

  private DeleteFoodItem(foodId: number) {}
}
