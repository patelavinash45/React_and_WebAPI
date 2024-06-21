import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodItem } from '../Interfaces/food-item';

@Injectable({
  providedIn: 'root',
})
export class APICallService {
  private baseUrl = 'http://localhost:5046';
  constructor(private httpClient: HttpClient) {}

  public GetAll(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/Food/GetFoodList');
  }

  public GetFoodItem(foodId: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/Food/GetFood/' + foodId);
  }

  public UpdateFoodItem(foodId: number, foodItem: FoodItem): Observable<any> {
    return this.httpClient.post(
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

  public LogIn(email: string, password: string) {
    const user = {
      email: email,
      password: password,
    };
    return this.httpClient.patch(this.baseUrl + '/User/ValidateUser', user);
  }
}
