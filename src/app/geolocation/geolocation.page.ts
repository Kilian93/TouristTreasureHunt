import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage {

  constructor(private router: Router) { }

  contentMap: any;
  position: any;
  coordinates = [28.1028, -15.4131];

  goToHome() {
    this.router.navigate(['/home']);
  }

  ionViewDidEnter() {
    this.contentMap = L.map('contentMap', {
      center: [this.coordinates[0], this.coordinates[1]],
      zoom: 15,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.contentMap);
    const mark = L.marker([this.coordinates[0], this.coordinates[1]], { draggable: false }).addTo(this.contentMap);
    let distance: any;

    this.contentMap.locate({ watch: true, setView: true, maxZoom: 16 }).on('locationfound', (e: any) => {
      if (this.position !== undefined) {
        this.position.setLatLng([e.latitude, e.longitude]);
        this.contentMap.setView([e.latitude, e.longitude], 30);
        // calculate the distance
        distance = Math.round(this.contentMap.distance([e.latitude, e.longitude], mark.getLatLng()));
        // show the distance
        this.position.bindPopup('You are ' + distance + ' metres from the target.').openPopup();
        //
        // draw the way

        setTimeout(() => {
            if (distance <= 3000) {
              this.router.navigate(['/rute111']);
            }
        }, 2000);

        L.Routing.control({
          waypoints: [
            L.latLng(e.latitude, e.longitude),
            L.latLng(this.coordinates[0], this.coordinates[1])
          ], routeWhileDragging: true

        }).addTo(this.contentMap);

        //
      } else {
        this.position = L.circleMarker([e.longitude, e.longitude], { radius: 5 }).addTo(this.contentMap);
        this.contentMap.setView([e.latitude, e.longitude], 30);
      }
    });
  }
}
