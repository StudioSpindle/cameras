const loadGoogleMapsApi = require('load-google-maps-api');
import { DataRow } from '../shared.types';

interface MarkerType {
  lat: Number;
  lng: Number;
}

export default async function(cameras: DataRow[]) {
  const utrecht: MarkerType = { lat: 52.090736, lng: 5.121420 };
  const mapCenter: MarkerType = utrecht;
  const mapElement: HTMLElement = document.getElementById('map')!;

  loadGoogleMapsApi({ key: process.env.API_KEY_GOOGLE_MAPS })
    .then(function(googleMaps: any) {
      const map = new googleMaps.Map(mapElement, {
        center: mapCenter,
        zoom: 14
      });
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
    }).catch((err: any) => {
      throw new Error(err);
    });
}