import { Business } from './business';
import { Region } from './region';

export interface BusinessSearchResponse {
  total: number;
  businesses: Business[];
  region: Region;
}
