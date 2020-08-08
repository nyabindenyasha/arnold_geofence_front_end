import { Component, OnInit } from '@angular/core';
import { HttpRequestComponent } from 'src/app/provider/http-request/http-request.component';
import { Cow } from 'src/app/models/cow';

@Component({
  selector: 'app-heartrate-data',
  templateUrl: './heartrate-data.component.html',
  styleUrls: ['./heartrate-data.component.scss']
})
export class HeartrateDataComponent implements OnInit {

  lineChartData: Array<any>;
  lineChartLabels: Array<any>
  cowData: Cow[];

  constructor(private http: HttpRequestComponent) { }

  ngOnInit() {
    this.getData();
    // this.lineChartData = [ 235, 236, 266, 237, 238, 248, 240 ];
    // this.lineChartLabels = ['0600', '0630', '0700', '0730', '0800', '0830', '0900'];
  }

  getData(){
    this.http.get('cow', (result) => {
      console.log(result);
      this.cowData = result;
      this.lineChartLabels = [];
      this.lineChartData = [];
      this.cowData.forEach(x => {
        this.lineChartData.push(x.heartrate);
        this.lineChartLabels.push(x.timeLabel);
      })
    });
  }


  public chartOption = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }


  public horizontalChartOption = {
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    }
  ];


}
