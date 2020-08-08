
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { RatingBoardComponent } from './components/rating-board/rating-board.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { HttpRequestComponent } from './provider/http-request/http-request.component';
import { HttpClientModule } from '@angular/common/http';
import { LineChartTooComponent } from './components/line-chart-too/line-chart-too.component';
import { LineChartThreeComponent } from './components/line-chart-three/line-chart-three.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { TemperatureDataComponent } from './components/temperature-data/temperature-data.component';
import { HeartrateDataComponent } from './components/heartrate-data/heartrate-data.component';
import { GpsDataComponent } from './components/gps-data/gps-data.component';
import { MapsComponent } from './components/maps/maps.component';
import { TableViewComponent } from './provider/table/table-view/table-view.component';
import { TablePaginationComponent } from './provider/table/table-pagination/table-pagination.component';
import { FormViewComponent } from './provider/form-view/form-view.component';


import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  declarations: [
    AppComponent,
    RatingBoardComponent,
    ProgressBarComponent,
    LineChartComponent,
    HttpRequestComponent,
    LineChartTooComponent,
    LineChartThreeComponent,
    GoogleMapsComponent,
    TemperatureDataComponent,
    HeartrateDataComponent,
    GpsDataComponent,
    MapsComponent,
    TableViewComponent,
    TablePaginationComponent,
    FormViewComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyChIFGIs_Lj13L_TTB4A5sciiD7GVXTHcA'
    }),
    AgmDirectionModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpRequestComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
