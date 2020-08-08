import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { HttpRequestComponent } from 'src/app/provider/http-request/http-request.component';
import { CowParameters } from 'src/app/models/cow-parameters';

declare const google;

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {

  constructor(private loader: MapsAPILoader, private http: HttpRequestComponent) { }

  latitude = -20.1732963;
  longitude = 28.5429545;

  showAlert = false;
  showLocationUpdate = false;
  theRanchPolygon: any;
  cowParameters: CowParameters;
  currentTemperature: number;
  currentHeartRate: number;

  isTemperatureData: boolean = false;

  isDataLoaded: boolean = false;
  isHeartRateData: boolean = false;
  isGPS: boolean = false;

  center = {
    lat: -20.1732963,
    lng: 28.5429545,
  };


  polygon = [
    { lat: -20.174066703839983, lng: 28.54388522652818 },
    { lat: -20.17416740994302, lng: 28.542906220237743 },
    { lat: -20.174001244838117, lng: 28.541658993045818 },
    { lat: -20.172203629203384, lng: 28.541913802902233 },
    { lat: -20.172213699936922, lng: 28.543697471897136 },
    { lat: -20.174066703839983, lng: 28.543877179901134 },
  ];

  ngOnInit() {
    console.log("init");
   // this.getData();

    this.loader.load().then(() => {
      this.theRanchPolygon = new google.maps.Polygon({ paths: this.polygon });
    });

    console.log(this.theRanchPolygon);


    setTimeout(() => {
      this.getData();
      this.updatePosition();
    }, 2000);

    setInterval(() => {
      this.getData();
      this.updatePosition();
    }, 60000);

  }

  getData() {
    this.http.get('cattle/cowParameters', (result) => {
      console.log(result);
      this.cowParameters = result;
      console.log(this.cowParameters);      
      this.currentHeartRate = result.heartrate;
      this.currentTemperature = result.temp;
      this.latitude = this.cowParameters.lat,
      this.longitude = this.cowParameters.lng
    });
  }

  updatePosition() {

    let position = {
      lat: this.cowParameters.lat,
      lng: this.cowParameters.lng,
    }

    this.center = {
      ...position,
    };
    const latLng = new google.maps.LatLng(position);
    console.log("latLng", latLng);

    console.log(google.maps.geometry.poly.containsLocation(latLng, this.theRanchPolygon));
    

    if (
      !google.maps.geometry.poly.containsLocation(latLng, this.theRanchPolygon)
    ) {
    //  alert("yes")
      this.showAlert = true;
      this.showLocationUpdate = false;
      this.http.get('cattle/cowOutOfRange', (result) => {
        console.log(result);
      });
    }

    else{  
    this.showLocationUpdate = true;
    this.showAlert = false;
    }

    this.isDataLoaded = true;
  }

  heartRateClick() {
    console.log("heart");
    this.isHeartRateData = true;
    this.isTemperatureData = false;
    this.isGPS = false;
  }

  temperatureClick() {
    console.log("temp");
    this.isTemperatureData = true;
    this.isHeartRateData = false;
    this.isGPS = false;
  }

  gpsClick() {
    console.log("gps");
    this.isGPS = true;
    this.isTemperatureData = false;
    this.isHeartRateData = false;
  }

  onChoseLocation(event) {
    console.log(event);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.showAlert = true;
    this.showLocationUpdate = false;
  }


}
