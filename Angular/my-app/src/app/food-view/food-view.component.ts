import { Component } from '@angular/core';
import { FoodItem } from '../../Interfaces/food-item';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { APICallService } from '../../Services/APICall/apicall.service';

@Component({
  selector: 'app-food-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './food-view.component.html',
  styleUrl: './food-view.component.css',
})
export class FoodViewComponent {
  foodId!: number;
  foodItem!: FoodItem;

  constructor(
    public apiCallService: APICallService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.foodId = this.route.snapshot.params['foodId'];
    this.apiCallService.GetFoodItem(this.foodId).subscribe((data) => {
      this.foodItem = data.result;
    });
  }

  navigateToEditPage(foodItem: FoodItem) {
    this.router.navigate(['/Food/Edit/', foodItem.foodId], {
      state: { foodItem },
    });
  }
}
