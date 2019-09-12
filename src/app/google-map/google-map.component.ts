import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Marker } from './marker.model';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @ViewChild('markerTitle', {static: false}) markerTitle: ElementRef;
  @ViewChild('markerType', {static: false}) markerType: ElementRef;

  // Initial map position
  lat: number = 47.4979;
  lng: number = 19.0402;
  // Initial map zoom level
  zoom: number = 10;

  markers: Marker[] = [];

  constructor() { }

  ngOnInit() {
    
  }

  onMapClick(event) {
    this.addMarker(new Marker(event.coords.lat,
                              event.coords.lng,
                              this.markerTitle.nativeElement.value,
                              this.markerType.nativeElement.value));
  }

  onMarkerRemove(marker: Marker) {
    this.markers.splice(this.markers.indexOf(marker), 1);
  }

  addMarker(marker: Marker) {
    this.markers.push(marker);
  }

}
