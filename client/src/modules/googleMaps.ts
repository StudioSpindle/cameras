const loadGoogleMapsApi = require('load-google-maps-api');
import { DataRow } from '../../shared.types';

export default async function(cameras: DataRow[]): Promise<typeof google.maps> {
  const utrecht: google.maps.LatLng | google.maps.LatLngLiteral = { lat: 52.090736, lng: 5.121420 };
  const mapCenter: google.maps.LatLng | google.maps.LatLngLiteral = utrecht;
  const mapElement: HTMLElement = document.getElementById('map')!;

  return loadGoogleMapsApi({ key: process.env.API_KEY_GOOGLE_MAPS })
    .then(function(googleMaps: typeof google.maps) {
      const mapOptions: google.maps.MapOptions = { center: mapCenter, zoom: 14 }
      const map = new googleMaps.Map(mapElement, mapOptions);

      cameras.forEach(({
        Camera,
        Latitude,
        Longitude
      }) => {
        const infowindow = new googleMaps.InfoWindow({
          content: Camera
        });
        const marker = new googleMaps.Marker({
          position: { lat: +Latitude, lng: +Longitude },
          map: map,
          animation: googleMaps.Animation.DROP,
          title: Camera
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker)
        });
      })
    }).catch((err: string) => {
      throw new Error(err);
    });
}