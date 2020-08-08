import { Component, OnInit } from '@angular/core';
import { Cow } from 'src/app/models/cow';
import { HttpRequestComponent } from 'src/app/provider/http-request/http-request.component';
import { TableCompose } from 'src/app/provider/table/table-compose';
import { DataType } from 'src/app/provider/table/data-type.enum';
import swal from 'sweetalert2';
import { Coordinates } from 'src/app/models/coordinates';

@Component({
  selector: 'app-gps-data',
  templateUrl: './gps-data.component.html',
  styleUrls: ['./gps-data.component.scss']
})
export class GpsDataComponent implements OnInit {

  cowDetails: Cow[];
  tableData: TableCompose;
  tableData2: TableCompose;
  selected: any;
  isAdd: boolean;
  btnLeft: any;
  coordinatesDetails: Coordinates;
  isMaps: boolean = false;

  constructor(private http: HttpRequestComponent) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.http.get('/cow', (categories) => this.loadCow(categories));
  }

  loadCow(c: Cow[]) {
    this.cowDetails = c;
    console.log(this.cowDetails)
    this.tableData = new TableCompose()
      .composeHeader('id', ' Id ', DataType.Plain)
      .composeHeader('lat', 'Latitutde', DataType.Plain)
      .composeHeader('lng', 'Longitude', DataType.Plain)
      .composeHeader('dateTime', 'Date Time', DataType.Date)
      .setBody(this.cowDetails);
  }

  itemClick(item) {
    this.selected = item;
    this.isAdd = false;
    this.setButtons()
  }

  setButtons() {
    this.btnLeft = [
      { title: 'View Latest Movement', color: 'primary-color', isVerify: true, name: '', action: 'activated', activate: true },
    ]
  }

  addClick() {
    this.selected = {};
    this.isAdd = true;
  }

  editClick(item) {
    this.selected = item;
    this.isAdd = true;
  }

  deleteClick(item: Cow) {
    this.http.delete('/cow/' + item.id, (result) => {
      swal('', result.message, 'success');
      console.log(result);
      this.reload(result)
    });
  }

  reload($event) {
    setTimeout(() => {
      this.getAll();
    }, 1000);
    this.isAdd = false;
    this.selected = null;
  }

  onCustomBtnAction(event) {
    console.log(event);
    this.http.get('/cow/getPath/' + event.id, (result) => this.coordinatesDetails = result);
    setTimeout(() => {
      console.log(this.coordinatesDetails);
      this.isMaps = true;
      this.selected = null;
    }, 200);
  }
}
