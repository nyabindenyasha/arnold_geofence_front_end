import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  sliderModel: SliderModel = new SliderModel();
  public chartDatasets: Array<any>;
  // public chartLabels: Array<any>;
  // public chartColors: Array<any>;
  public chartOptions: any;
  public chartType: string = 'bar';
  interval: number = 1000;

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartLabels: Array<any> = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

  constructor() { }

  ngOnInit() {
    this.createChart();
    this.refreshChart();
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  onSubmit() {
    console.log(this.sliderModel);
  }

  createChart() {
    this.chartDatasets = [
      { data: [this.sliderModel.sliderValue, 59, 80, 81, 56, 55, 0], label: 'Power Production vs Consumption Data' }
    ];  

    this.chartOptions = {
      responsive: true
    };
  }

  refreshChart() {
    setInterval(() => {
     this.createChart();     
    }, this.interval);  
}

}

export class SliderModel {
  sliderValue: number = 30;
  toggleValue: boolean = false;
}