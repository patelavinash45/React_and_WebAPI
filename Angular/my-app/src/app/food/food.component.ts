import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FoodItem } from '../../Interfaces/food-item';
import { APICallService } from '../../Services/APICall/apicall.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DeleteModalComponent } from '../ChildComponents/delete-modal/delete-modal.component';
import { FilterDto } from '../../Interfaces/filter-dto';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
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
    foodType: 0,
  };
  @ViewChild(DeleteModalComponent) deleteModal!: DeleteModalComponent;
  @Input() animationTime: number = 0.2;
  private searchSubject = new Subject<string>();

  constructor(public apiCallService: APICallService, private router: Router) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((searchTerm: string) => {
      this.pageNo = 1;
      this.filterDto.searchElement = searchTerm;
      this.getData();
    });
  }

  getData() {
    this.apiCallService.GetAll(this.pageNo, this.pageSize, this.filterDto).subscribe((data) => {
      this.details = data.result;
      this.foodItems = data.result.records;
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  onPageSizeSelectChange(event: any) {
    this.pageNo = 1;
    this.pageSize = event.target.value;
    this.getData();
  }

  onFoodTypeSelectChange(event: any) {
    this.filterDto.foodType = event.target.value;
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
    this.searchSubject.next(event.target.value);
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

  LogOut() {
    localStorage.removeItem("jwtToken");
    this.router.navigate(['/LogIn']);
  }
}
