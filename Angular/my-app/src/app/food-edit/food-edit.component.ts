import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FoodItem } from '../../Interfaces/food-item';
import { APICallService } from '../../Services/APICall/apicall.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ShowToasterService } from '../../Services/show-toaster.service';

@Component({
  selector: 'app-food-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './food-edit.component.html',
  styleUrl: './food-edit.component.css',
})
export class FoodEditComponent {
  foodId!: number;
  foodItem!: FoodItem;
  form!: FormGroup;

  constructor(
    private apiCallService: APICallService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ShowToasterService
  ) { }

  ngOnInit(): void {
    this.foodId = this.route.snapshot.params['foodId'];
    this.apiCallService.GetFoodItem(this.foodId).subscribe((data) => {
      this.foodItem = data.result;
      this.form = new FormGroup({
        name: new FormControl(this.foodItem.name, Validators.required),
        isVeg: new FormControl(this.foodItem.isVeg, Validators.required),
        price: new FormControl(this.foodItem.price, Validators.required),
      });
    });
  }

  formSubmit() {
    this.apiCallService
      .UpdateFoodItem(this.foodId, this.form.value)
      .subscribe(() => {
        this.toaster.showSuccessMessage("Item Updated Successfully.");
        this.router.navigate(['Food/View/', this.foodId]);
      });
  }
}
