import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';

import { MapsAPILoader, MouseEvent } from '@agm/core';
import * as MarkerClusterer from "@google/markerclusterer"

import { Marker } from './marker.model';

import { Polyline } from "./encoded-polyline";

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  // TODO: 
  // 1. Посмотреть, можно ли программно сделать скрин карты и вставить в емейл.
  // 2. Разбирать API Google Translate

  @ViewChild('markerTitle', {static: false})
  markerTitle: ElementRef;
  
  @ViewChild('markerType', {static: false})
  markerType: ElementRef;

  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;

  // Initial map position
  lat: number = 47.4979;
  lng: number = 19.0402;
  // Initial map zoom level
  zoom: number = 10;
  address: string;
  markers: Marker[] = []; // REFACTOR: NEED TO USE google.maps.Marker INSTEAD OF THIS

  private geoCoder;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(
      () => {
        // this.setCurrentLocation();
        this.geoCoder = new google.maps.Geocoder;

        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ["address"]
        });

        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
            this.setMarker(new Marker(this.lat,
                                      this.lng,
                                      this.markerTitle.nativeElement.value || place.name,
                                      this.markerType.nativeElement.value));
            this.zoom = 15;
          });
        });
      }
    )

    this.setMarkers([
      new Marker(47.537005, 19.114172, "Marker for job", "job"),
      new Marker(47.389374, 19.095465, "Marker for consult", "consult"),
      new Marker(47.510676, 18.835786, "Marker for help", "help"),
    ])
  }

  // onMapClick(event) {
  //   this.setMarker(new Marker(event.coords.lat,
  //                             event.coords.lng,
  //                             this.markerTitle.nativeElement.value,
  //                             this.markerType.nativeElement.value));
  // }

  onMarkerRemove(marker: Marker) {
    this.markers.splice(this.markers.indexOf(marker), 1);
  }

  setMarker(marker: Marker) {
    this.markers.push(marker);
  }

  setMarkers(markers: Marker[]) {
    markers.forEach(marker => {
      this.setMarker(marker);
    });
  }

  getStaticMapImage(lat: number = this.lat, lng: number = this.lng, 
                    zoom: number = this.zoom, width: number = 400, height: number = 400,
                    apiKey: string = "AIzaSyDEzJs8-e0qS73YnRZfgoqzS2JOZX9WvnI",
                    markers: {lat: number, lng: number}[] = [{lat: this.lat, lng: this.lng}],
                    path: boolean = true) {
    
    zoom = 11;

    markers.push({lat: this.lat + 0.04, lng: this.lng + 0.08});
    
    let queryString = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat.toString() + "," + lng.toString() +
                      "&zoom=" + zoom.toString() + "&size=" + width.toString() + "x" + height.toString();
    
    if (markers) {
      queryString += "&markers="
      markers.forEach(marker => {
        queryString += marker.lat + ',' + marker.lng + '|';
      });
    }

    if (path && markers) {
      let pl = new Polyline;
      queryString += "&path=color:red|weight:5|enc:" + pl.encodeGPolyline(markers.map(item => [item.lat, item.lng]));
      // queryString += "&path=";
      // markers.forEach(marker => {
      //   queryString += marker.lat.toFixed(5) + ',' + marker.lng.toFixed(5) + '|';
      // });
    }
    
    return queryString + "&key=" + apiKey;
  }

  // setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.lat = position.coords.latitude;
  //       this.lng = position.coords.longitude;
  //       this.zoom = 8;
  //       this.getAddress(this.lat, this.lng);
  //     });
  //   }
  // }

  // getAddress(latitude, longitude) {
  //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 12;
  //         this.address = results[0].formatted_address;
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }

  //   });
  // }

}
