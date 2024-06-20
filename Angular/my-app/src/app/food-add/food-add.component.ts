import { Component } from '@angular/core';
import { FoodItem } from '../../Interfaces/food-item';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { APICallService } from '../../APICall/apicall.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-food-add',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './food-add.component.html',
  styleUrl: './food-add.component.css',
})
export class FoodAddComponent {
  foodId!: number;
  foodItem!: FoodItem;
  form!: FormGroup;

  constructor(
    private apiCallService: APICallService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.foodId = this.route.snapshot.params['foodId'];
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      isVeg: new FormControl(true, Validators.required),
      price: new FormControl('', Validators.required),
    });
  }

  formSubmit() {
    this.apiCallService
      .AddFoodItem(this.form.value)
      .subscribe(() => {
        this.router.navigate(['/Food']);
      });
  }
}
