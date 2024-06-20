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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6IkFBIiwiZW1haWwiOiJhYUBnbWFpbC5jb20iLCJleHAiOjE3MTg3OTMwNDAsImlzcyI6Iklzc3VlciIsImF1ZCI6IkF1ZGllbmNlIn0.2s7O4Lvm73GtOhLqOpgjfcw1Pd4YHf8GhQ0ug0p0B-A',
    }),
  };

  // public HandleAPIResponse(response: any) {
  //   console.log(response);
  //   debugger;
  //   return response.IsSusses ? response.result : response.errorMessage;
  // }

  public GetAll(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/Food/GetFoodList');
  }

  public GetFoodItem(foodId: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/Food/GetFood/' + foodId);
  }

  public UpdateFoodItem(foodId: number, foodItem: FoodItem): Observable<any> {
    return this.httpClient.post(
      this.baseUrl + '/Food/UpdateFood/' + foodId,
      JSON.stringify(foodItem),
      this.httpOptions
    );
  }

  public DeleteFoodItem(foodId: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/Food/DeleteFood/' + foodId);
  }

  public AddFoodItem(foodItem: FoodItem): Observable<any> {
    return this.httpClient.post(
      this.baseUrl + '/Food/AddFood',
      JSON.stringify(foodItem),
      this.httpOptions
    );
  }
}
