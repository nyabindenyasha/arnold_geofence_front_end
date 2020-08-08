import { Component, OnInit } from '@angular/core';
import { Cow } from 'src/app/models/cow';
import { HttpRequestComponent } from 'src/app/provider/http-request/http-request.component';

@Component({
  selector: 'app-temperature-data',
  templateUrl: './temperature-data.component.html',
  styleUrls: ['./temperature-data.component.scss']
})
export class TemperatureDataComponent implements OnInit {

  lineChartData: Array<any>;
  lineChartLabels: Array<any>
  cowData: Cow[];

  constructor(private http: HttpRequestComponent) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.http.get('cow', (result) => {
      console.log(result);
      this.cowData = result;
      this.lineChartLabels = [];
      this.lineChartData = [];
      this.cowData.forEach(x => {
        this.lineChartData.push(x.temp);
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
