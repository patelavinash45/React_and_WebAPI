import { Component, ViewChild, viewChild } from '@angular/core';
import { FoodItem } from '../../Interfaces/food-item';
import { APICallService } from '../../APICall/apicall.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DeleteModalComponent } from '../ChildComponents/delete-modal/delete-modal.component';
declare var $: any;

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [CommonModule, RouterLink, DeleteModalComponent],
  templateUrl: './food.component.html',
  styleUrl: './food.component.css',
})
export class FoodComponent {
  foodItems: FoodItem[] = [];
  @ViewChild(DeleteModalComponent) deleteModal!: DeleteModalComponent;
  constructor(public apiCallService: APICallService, private router: Router) {}

  ngOnInit(): void {
    this.apiCallService.GetAll().subscribe((data) => {
      this.foodItems = data.result;
    });
  }

  deleteFoodItem(foodId: number) {
    this.deleteModal.foodId = foodId;
    $('#exampleModal').modal('show');
  }

  navigateToEditPage(foodItem: FoodItem) {
    this.router.navigate(['/Food/Edit/', foodItem.foodId], {
      state: { foodItem },
    });
  }
}
