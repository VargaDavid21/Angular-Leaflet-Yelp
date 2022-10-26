import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BusinessSearchResponse } from '../models/business-search-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusinessSearchService {
  private yelpApiBusinessSearchUrl: string =
    'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
  constructor(private http: HttpClient) {}

  getBusinesses(params: any): Observable<BusinessSearchResponse> {
    return this.http.get<BusinessSearchResponse>(
      this.yelpApiBusinessSearchUrl,
      {
        params,
      }
    );
  }
}
