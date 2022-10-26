import * as L from 'leaflet';

export function getMarkerIcon(markerType: string): L.Icon {
  return L.icon({
    iconRetinaUrl: `assets/icon-marker-${markerType}-2x.png`,
    iconUrl: `assets/icon-marker-${markerType}.png`,
    shadowUrl: 'assets/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });
}

export function normalizeCoordinates(coordinates: L.LatLng): L.LatLng {
  if (Math.abs(coordinates.lng) > 180 || Math.abs(coordinates.lat) > 90) {
    location.reload();
  }
  coordinates.lng =
    (coordinates.lng >= 180 ? 1 : coordinates.lng <= -180 ? -1 : 0) * 180 +
    (coordinates.lng % 180);
  return coordinates;
}
