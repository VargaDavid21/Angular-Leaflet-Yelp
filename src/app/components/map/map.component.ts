import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../../services/marker.service';
import { BusinessSearchResponse } from '../../models/business-search-response';
import { Business } from 'src/app/models/business';
import { getMarkerIcon, normalizeCoordinates } from '../../helpers/map-utils';
import { generateIconArrayFromBusinessRating } from '../../helpers/app-utils';

L.Marker.prototype.options.icon = getMarkerIcon('business');

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  public businesses: Business[] | undefined;
  selectedBusiness: Business | undefined;
  cursorCoordinates: L.LatLng | undefined;
  mousePosition: { x: number; y: number } | undefined;
  showCursorCoordinates: boolean = true;
  private map: L.Map | undefined;
  currentClickMarker: L.Marker | undefined;
  currentHighlightMarker: L.Marker | undefined;
  currentBusinessMarkers: L.Marker[] = [];
  markerServiceBusy: boolean = false;

  constructor(private markerService: MarkerService) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  // initialization of the map object
  private initMap(): void {
    this.map = L.map('map', {
      center: [30, 0],
      zoom: 3,
    });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 2,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    this.map.addLayer(tiles);
    this.map.removeControl(this.map.zoomControl).addControl(
      L.control.zoom({
        position: 'bottomright',
      })
    );

    // map click event - you cannot
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      if (this.markerServiceBusy) {
        return;
      }
      this.markerServiceBusy = true;

      this.resetMarkers();
      //Add click marker
      const coordinates = normalizeCoordinates(e.latlng);
      this.currentClickMarker = L.marker([coordinates.lat, coordinates.lng], {
        icon: getMarkerIcon('click'),
      });
      this.map?.addLayer(this.currentClickMarker);

      this.markerService
        .getBusinessesByLatitudeLongitude(coordinates.lat, coordinates.lng)
        .subscribe({
          next: (businessSearchResponse: BusinessSearchResponse) => {
            if (!businessSearchResponse.businesses.length) {
              alert('No businesses found in selected area!');
              this.currentClickMarker?.remove();
              this.businesses = undefined;
            } else {
              this.setBusinesses(businessSearchResponse.businesses);
            }
            this.markerServiceBusy = false;
          },
          error: (error: any) => {
            alert('Something went wrong, please try again!\n' + error.message);
            this.markerServiceBusy = false;
            this.businesses = undefined;
          },
        });
    });
    this.map.on('mousemove', (e: L.LeafletMouseEvent) => {
      this.cursorCoordinates = normalizeCoordinates(e.latlng);
      this.mousePosition = {
        x: e.originalEvent.screenX,
        y: e.originalEvent.screenY,
      };
    });
    this.map.on('mouseout', () => {
      if (this.showCursorCoordinates) {
        this.showCursorCoordinates = false;
      }
    });
    this.map.on('mouseover', () => {
      if (!this.showCursorCoordinates) {
        this.showCursorCoordinates = true;
      }
    });
  }

  // resets markers after clicking other place
  private resetMarkers(): void {
    if (this.currentClickMarker) {
      this.currentClickMarker.remove();
      this.currentBusinessMarkers.forEach((businessMarker: L.Marker) => {
        businessMarker.remove();
      });
      if (this.currentBusinessMarkers.length) {
        this.currentBusinessMarkers = [];
      }
      if (this.businesses?.length) {
        this.businesses = [];
      }
      if (this.selectedBusiness) {
        this.selectedBusiness = undefined;
      }
    }
  }

  // ???
  private setBusinesses(businesses: Business[]): void {
    this.businesses = businesses;
    this.businesses.forEach((business: Business) => {
      this.setBusinessMarker(business);
    });
  }

  //
  private setBusinessMarker(business: Business): void {
    const marker = L.marker(
      [business.coordinates.latitude, business.coordinates.longitude],
      {
        attribution: business.id,
      }
    );
    this.map?.addLayer(marker);
    marker.on('click', (e: L.LeafletMouseEvent) => {
      this.highlightBusiness(e.target.options.attribution);
    });
    this.currentBusinessMarkers.push(marker);
    this.fitMapView();
  }

  // highlights business
  public highlightBusiness(id: string): void {
    this.markerService.getBusinessDetailsById(id)?.subscribe({
      next: (business: Business) => {
        this.selectedBusiness = business;
        setTimeout(() => {
          document.querySelector('.marker--selected')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        });
      },
    });
    this.currentHighlightMarker?.setIcon(getMarkerIcon('business'));
    this.currentHighlightMarker = this.currentBusinessMarkers
      .find(
        (businessMarker: L.Marker) => businessMarker.getAttribution?.() === id
      )
      ?.setIcon(getMarkerIcon('highlight'));
    this.fitMapView();
  }

  // fits the map view
  private fitMapView(): void {
    this.map?.flyToBounds(
      L.featureGroup([
        ...(this.currentClickMarker ? [this.currentClickMarker] : []),
        ...this.currentBusinessMarkers,
      ]).getBounds()
    );
  }

  public generateIconArrayFromBusinessRating: (rating: number) => string[] =
    generateIconArrayFromBusinessRating;
}
