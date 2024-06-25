import { Component, ViewChild } from '@angular/core';
import { FoodItem } from '../../Interfaces/food-item';
import { APICallService } from '../../APICall/apicall.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DeleteModalComponent } from '../ChildComponents/delete-modal/delete-modal.component';
import { FilterDto } from '../../Interfaces/filter-dto';
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
  details: any;
  pageNo: number = 1;
  pageSize: number = 5;
  filterDto: FilterDto = {
    searchElement: null,
    lowToHigh: true,
  };
  @ViewChild(DeleteModalComponent) deleteModal!: DeleteModalComponent;
  constructor(public apiCallService: APICallService, private router: Router) { }

  getData() {
    this.apiCallService.GetAll(this.pageNo, this.pageSize, this.filterDto).subscribe((data) => {
      this.details = data.result;
      console.log(data);
      this.foodItems = data.result.records;
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  onPageSizeSelectChange(event: any) {
    this.pageSize = event.target.value;
    this.getData();
  }

  onPriceFilterChange() {
    this.filterDto.lowToHigh = !this.filterDto.lowToHigh;
    this.getData();
  }

  changePageNo(pageNo: number) {
    this.pageNo = pageNo;
    this.getData();
  }

  searchItem(event: any) {
    this.filterDto.searchElement = event.target.value;
    this.getData();
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
