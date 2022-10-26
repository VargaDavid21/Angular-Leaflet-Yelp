import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Business } from '../models/business';

@Injectable({
  providedIn: 'root',
})
export class BusinessDetailsService {
  private yelpApiBusinessDetailsUrl: string =
    'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/';
  constructor(private http: HttpClient) {}

  getBusinessDetails(id: string): Observable<Business> {
    return this.http.get<Business>(`${this.yelpApiBusinessDetailsUrl}${id}`);
  }
}
