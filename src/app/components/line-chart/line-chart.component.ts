import { Component, OnInit } from '@angular/core';
import { HttpRequestComponent } from 'src/app/provider/http-request/http-request.component';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  public chartType: string = 'line';

  chartData: ChartData = new ChartData();

  public chartDatasets: Array<any>;

  public chartLabels: Array<any> = [ '0600', '0630', '0700', '0730', '0800', '0830', '0900'];

  constructor(private http: HttpRequestComponent) { }

  ngOnInit() {
    // this.getAll();
    // this.refreshChart();

    this.chartData.data = [36, 36, 37, 37, 37, 38, 40];
    
  this.chartDatasets = [
    { data: this.chartData.data, label: 'Temperature of cow' },
  ];
  }

  // refreshChart() {
	// 	setInterval(() => {
	// 		this.processPower();
	// 		this.recreateChart();
	// 	}, 5000);
	// }

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}


export class ChartData{
  data: Array<number>;
  label: string;
}
