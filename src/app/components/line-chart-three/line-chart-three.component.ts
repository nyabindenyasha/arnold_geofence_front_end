import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-chart-three',
  templateUrl: './line-chart-three.component.html',
  styleUrls: ['./line-chart-three.component.scss']
})
export class LineChartThreeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // lineChart
  // public lineChartData: Array<any> = [
  //   50000, 25000, 50000
  // ];
  // public lineChartLabels: Array<any> = ['Set 1', 'Set 2', 'Set 3'];

  // public lineChartData: Array<any> = [
  //    35, 36, 36, 37, 38, 38, 40 
  // ];

  public lineChartData: Array<any> = [
    235, 236, 266, 237, 238, 248, 240 
 ];

  public lineChartLabels: Array<any> = ['0600', '0630', '0700', '0730', '0800', '0830', '0900'];


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
