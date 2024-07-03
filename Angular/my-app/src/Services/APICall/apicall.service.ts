import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodItem } from '../../Interfaces/food-item';
import { FilterDto } from '../../Interfaces/filter-dto';

@Injectable({
  providedIn: 'root',
})
export class APICallService {
  private baseUrl = 'http://localhost:5046';
  constructor(private httpClient: HttpClient) { }

  public GetAll(pageNo: number, pageSize: number, filterDto: FilterDto): Observable<any> {
    return this.httpClient.patch(
      this.baseUrl + `/Food/GetFoodList/pageNo=${pageNo}&pageSize=${pageSize}`,
      filterDto);
  }

  public GetFoodItem(foodId: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/Food/GetFood/' + foodId);
  }

  public UpdateFoodItem(foodId: number, foodItem: FoodItem): Observable<any> {
    return this.httpClient.put(
      this.baseUrl + '/Food/UpdateFood/' + foodId,
      JSON.stringify(foodItem)
    );
  }

  public DeleteFoodItem(foodId: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/Food/DeleteFood/' + foodId);
  }

  public AddFoodItem(foodItem: FoodItem): Observable<any> {
    return this.httpClient.post(
      this.baseUrl + '/Food/AddFood',
      JSON.stringify(foodItem)
    );
  }

  public LogIn(user: any): Observable<any> {
    return this.httpClient.patch(this.baseUrl + '/User/ValidateUser', user);
  }

  public ValidateToken(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/User/ValidateJwtToken`);
  }
}
