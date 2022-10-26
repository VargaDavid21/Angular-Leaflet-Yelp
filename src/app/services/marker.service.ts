import { Injectable } from '@angular/core';
import { BusinessSearchService } from './business-search.service';
import { BusinessDetailsService } from './business-details.service';
import { Observable } from 'rxjs';
import { BusinessSearchResponse } from '../models/business-search-response';
import { BusinessSearchRequest } from '../models/business-search-request';
import { Business } from '../models/business';

@Injectable({ providedIn: 'root' })
export class MarkerService {
  constructor(
    private businessSearchService: BusinessSearchService,
    private businessDetailsService: BusinessDetailsService
  ) {}

  getBusinessesByLatitudeLongitude(
    latitude: number,
    longitude: number,
    limit?: number
  ): Observable<BusinessSearchResponse> {
    const params: BusinessSearchRequest = {
      latitude,
      longitude,
      ...(limit && { limit }),
    };
    return this.businessSearchService.getBusinesses(params);
  }

  getBusinessDetailsById(id?: string): Observable<Business> | undefined {
    if (!id) {
      return;
    }
    return this.businessDetailsService.getBusinessDetails(id);
  }
}
