import { Component } from '@angular/core';
import { FoodItem } from '../../Interfaces/food-item';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { APICallService } from '../../APICall/apicall.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-food-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-food-item.component.html',
  styleUrl: './view-food-item.component.css',
})
export class ViewFoodItemComponent {
  foodId!: number;
  foodItem!: FoodItem;

  constructor(
    public apiCallService: APICallService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('fsdfsdf');
  }

  ngOnInit(): void {
    this.foodId = this.route.snapshot.params['foodId'];
    this.apiCallService.GetFoodItem(2).subscribe((data) => {
      this.foodItem = data.result;
    });
  }
}
