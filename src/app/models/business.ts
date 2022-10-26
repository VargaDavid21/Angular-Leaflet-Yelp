import { BusinessCategory } from './business-category';
import { Coordinates } from './coordinates';
import { BusinessLocation } from './business-location';
import { BusinessHours } from './business-hours';
import { BusinessMessaging } from './business-messaging';

export interface Business {
  categories: BusinessCategory[];
  coordinates: Coordinates;
  display_phone: string;
  hours?: BusinessHours[];
  distance?: number;
  id: string;
  alias: string;
  image_url: string;
  is_claimed?: boolean;
  is_closed: boolean;
  location: BusinessLocation;
  messaging?: BusinessMessaging;
  name: string;
  phone: string;
  photos?: string[];
  price: string;
  rating: number;
  review_count: number;
  url: string;
  transactions: string[];
  special_hours?: BusinessHours;
  attributes?: object;
}
