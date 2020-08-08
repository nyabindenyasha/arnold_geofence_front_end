import { Component, OnInit, Input } from '@angular/core';
import { } from "googlemaps"
import { AgmCoreModule, MapsAPILoader } from "@agm/core";
import { Coordinates } from '../../models/coordinates';
// declare var google: any;


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  @Input() coordinates: Coordinates;
  title = 'angular-agm';
  location : Location =  {latitude: 24.799448, longitude:120.979021, markers : [{lat: 24.799448, lng: 120.979021, label: "My current position"}]}
  selectedMarker: Marker
  origin: any;
  destination: any;
  distance: any;

  ngOnInit() {
    this.origin = { lat: this.coordinates.sourceLat, lng: this.coordinates.sourceLong};
    this.destination = { lat: this.coordinates.destLat, lng: this.coordinates.destLong};
    // this.origin = { lat: -20.164341, lng: 28.640430 };
    // this.destination = { lat: -20.154893, lng: 28.582591 };
    this.setCurrentPosition();
  //  this.distance = this.calculateDistance(this.origin, this.destination)
    console.log(this.coordinates)
  }

  addMarker(lat: number, lng: number) {
    this.location.markers.push({
      lat,
      lng,
      label: Date.now().toLocaleString()
    });
  }
  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    }
  }
  markerDragEnd(coords: any, $event: MouseEvent) {
    this.location.latitude = coords.latitude
    this.location.longitude = coords.longitude
  }

  // getAddress(lat, lng) {
  //   const geocoder = new google.maps.Geocoder();
  //   var latlng = new google.maps.LatLng(lat, lng);
  //   const request: google.maps.GeocoderRequest = {
  //     location: latlng
  //   };
  //   geocoder.geocode(request, (results, status) => {
  //     this.ngZone.run(() => {
  //       const address = results[0].formatted_address;
  //       return address
  //     });
  //   });
  // } 


  setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        this.location = {
          latitude,
          longitude,
          mapType: "satelite",
          zoom: 14,
          markers: [
            {
              lat: longitude,
              lng: latitude,
              label: "My current position"
            }
          ]
        }
        this.selectedMarker = {
          lat: latitude,
          lng: longitude
        }
      });
    } else {
      alert("Geolocation is not supported by this browser, please use google chrome.");
    }
  }

  // calculateDistance(point1, point2) {
  //   const p1 = new google.maps.LatLng(
  //     point1.lat,
  //     point1.lng
  //   );
  //   const p2 = new google.maps.LatLng(
  //     point2.lat,
  //     point2.lng
  //   );
  //   return (
  //     google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000
  //   ).toFixed(2);
  // }

}

interface Marker {
  lat: number;
  lng: number;
  label?: string
}

interface Location {
  latitude: number;
  longitude: number;
  mapType?: string;
  zoom?: number;
  marker?: Marker;
  markers?: Array<Marker>;
}