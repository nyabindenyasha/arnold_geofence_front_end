import { Component, OnInit } from '@angular/core';
import { HttpRequestComponent } from 'src/app/provider/http-request/http-request.component';
import { PowerRequest } from 'src/app/models/power-request';
import { DeviceStatus } from 'src/app/models/device-status';
import swal from 'sweetalert2';

@Component({
	selector: 'app-power-balancing',
	templateUrl: './power-balancing.component.html',
	styleUrls: ['./power-balancing.component.scss']
})
export class PowerBalancingComponent implements OnInit {
	supplyPower: number;
	surbubANormal: number = 50;
	surbubAWithoutGeyser: number = 45;
	surbubAWithoutGeyserAndStove: number = 40;
	surbubBNormal: number = 30;
	surbubBWithoutGeyser: number = 25;
	surbubBWithoutGeyserAndStove: number = 20;
	surbubACurrent: number = 0;
	surbubBCurrent: number = 0;
	surbubAPrevious: number = 0;
	surbubBPrevious: number = 0;
	surbubAStatus: string;
	surbubBStatus: string;
	surplusPower: number;
	deficitPower: number = 0;
	sliderModel: SliderModel = new SliderModel();
	deviceStatusModel: DeviceStatusModel = new DeviceStatusModel();
	powerRequest: PowerRequest = new PowerRequest();
	deviceStatus: DeviceStatus;

	dataSupplyPower: Array<any> = [90];
	dataSurbubACons: Array<any> = [50];
	dataSurbubBCons: Array<any> = [30];
	i: number = 0;
	title: string = "tatenda title"

	public chartLabels1: Array<any>;
	public chartDatasets1: Array<any>;
	public chartLabels2: Array<any> = [0];
	// public chartDatasets2: Array<any>;
	public chartDatasets2: Array<any> = [
		{ data: [], label: 'Supply Power' },
		{ data: [], label: 'Surbub A Consumption' },
		{ data: [], label: 'Surbub B Consumption' }
	  ];
	public chartColors1: Array<any>;
	public chartColors2: Array<any>;
	public chartOptions: any;
	public chartType1: string = 'bar';
	public chartType2: string = 'line';

	constructor(private http: HttpRequestComponent) { }

	ngOnInit() {
		this.processPower();
		this.processChart();
		this.refreshChart();
	}

	refreshChart() {
		setInterval(() => {
			this.processPower();
			this.recreateChart();
		}, 30000);
	}

	setDeviceStatus(aG: boolean, bG: boolean, aS: boolean, bS: boolean, aOG: boolean, bOG: boolean) {
		this.deviceStatusModel.surbubAGeyserOn = aG;
		this.deviceStatusModel.surbubBGeyserOn = bG;
		this.deviceStatusModel.surbubAStoveOn = aS;
		this.deviceStatusModel.surbubBStoveOn = bS;
		this.deviceStatusModel.surbubAOtherGadgetsOn = aOG;
		this.deviceStatusModel.surbubBOtherGadgetsOn = bOG;
		this.deviceStatus = new DeviceStatus(aG, bG, aS, bS, aOG, bOG);
		console.log("device_status: ", this.deviceStatus);
		
	}

	setCurrent(a: number, b: number) {
		this.surbubACurrent = a;
		this.surbubBCurrent = b;
	}

	setAndMakePowerRequest(supply: number, a: number, b: number){
		this.powerRequest.supplyPower = supply;
		this.powerRequest.surbubACurrent = a;
		this.powerRequest.surbubBCurrent = b;
		this.http.post('power', this.deviceStatus, (result) => {
			console.log(result.message);
	//		swal('', result.message, 'success')
		}
		);
	}

	processPower() {
		this.supplyPower = this.sliderModel.sliderValue;
		if (this.surbubANormal + this.surbubBNormal <= this.supplyPower) {
			console.log("Previous Consumption: \n surburbA  -> " + this.surbubACurrent + ", \n surburb B -> " + this.surbubBCurrent);
			this.surbubAPrevious = this.surbubACurrent;
			this.surbubBPrevious = this.surbubBCurrent;
			console.log("supply power: " + this.supplyPower);
			console.log("The surplus power is: " + this.surplusPower);
			console.log("Status: \n surburb B -> all gadgets on, \n surburb A -> all gadgets on");
			this.setDeviceStatus(true, true, true, true, true, true);
			console.log("Current Consumption: \n surburbA  -> " + this.surbubANormal + ", \n surburb B -> " + this.surbubBNormal);
			this.setCurrent(this.surbubANormal, this.surbubBNormal);
			this.setAndMakePowerRequest(this.supplyPower, this.surbubACurrent, this.surbubBCurrent);
			this.surplusPower = this.supplyPower - (this.surbubACurrent + this.surbubBCurrent);
		}

		else if (this.surbubAWithoutGeyserAndStove > this.supplyPower) {
			this.deficitPower = (this.surbubAWithoutGeyserAndStove) - this.supplyPower;
			// console.log("Previous Consumption: \n surburbA  -> " + this.surbubAWithoutGeyserAndStove + ", \n surburb B -> " + this.surbubBWithoutGeyserAndStove);
			console.log("Previous Consumption: \n surburbA  -> " + this.surbubACurrent + ", \n surburb B -> " + this.surbubBCurrent);
			this.surbubAPrevious = this.surbubACurrent;
			this.surbubBPrevious = this.surbubBCurrent;
			console.log("supply power: " + this.supplyPower);
			console.log("Deficit Power: " + this.deficitPower);
			console.log("Shadding A completely");
			console.log("Status: \n surburb B -> shadded completely, \n surburb A -> shadded completely");
			this.setDeviceStatus(false, false, false, false, false, false);
			console.log("Current Consumption: \n surburbA  -> " + 0.00 + ", \n surburb B -> " + 0.00);
			this.setCurrent(0.00, 0.00);
			this.setAndMakePowerRequest(this.supplyPower, this.surbubACurrent, this.surbubBCurrent);
			this.surplusPower = this.supplyPower - (this.surbubACurrent + this.surbubBCurrent);
		}

		else if (this.surbubAWithoutGeyserAndStove + this.surbubBWithoutGeyserAndStove > this.supplyPower) {
			this.deficitPower = (this.surbubAWithoutGeyserAndStove + this.surbubBWithoutGeyserAndStove) - this.supplyPower;
			// console.log("Previous Consumption: \n surburbA  -> " + this.surbubAWithoutGeyserAndStove + ", \n surburb B -> " + this.surbubBWithoutGeyserAndStove);
			console.log("Previous Consumption: \n surburbA  -> " + this.surbubACurrent + ", \n surburb B -> " + this.surbubBCurrent);
			this.surbubAPrevious = this.surbubACurrent;
			this.surbubBPrevious = this.surbubBCurrent;
			console.log("supply power: " + this.supplyPower);
			console.log("Deficit Power: " + this.deficitPower);
			console.log("Shadding B completely");
			console.log("Status: \n surburb B -> shadded completely, \n surburb A -> geysers and stoves off");
			this.setDeviceStatus(false, false, false, false, true, false);
			console.log("Current Consumption: \n surburbA  -> " + this.surbubAWithoutGeyserAndStove + ", \n surburb B -> " + 0.00);
			this.setCurrent(this.surbubAWithoutGeyserAndStove, 0.00);
			this.setAndMakePowerRequest(this.supplyPower, this.surbubACurrent, this.surbubBCurrent);
			this.surplusPower = this.supplyPower - (this.surbubACurrent + this.surbubBCurrent);
		}

		else if (this.surbubAWithoutGeyser + this.surbubBWithoutGeyserAndStove > this.supplyPower) {
			this.deficitPower = (this.surbubAWithoutGeyser + this.surbubBWithoutGeyserAndStove) - this.supplyPower;
			// console.log("Previous Consumption: \n surburbA  -> " + this.surbubAWithoutGeyser + ", \n surburb B -> " + this.surbubBWithoutGeyserAndStove);
			console.log("Previous Consumption: \n surburbA  -> " + this.surbubACurrent + ", \n surburb B -> " + this.surbubBCurrent);
			this.surbubAPrevious = this.surbubACurrent;
			this.surbubBPrevious = this.surbubBCurrent;
			console.log("supply power: " + this.supplyPower);
			console.log("Deficit Power: " + this.deficitPower);
			console.log("Cutting surburb A's geysers and stoves");
			console.log("Status: \n surburb B -> geysers and stoves off, \n surburb A -> geysers and stoves off");
			this.setDeviceStatus(false, false, false, false, true, true);
			console.log("Current Consumption: \n surburbA  -> " + this.surbubAWithoutGeyserAndStove + ", \n surburb B -> " + this.surbubBWithoutGeyserAndStove);
			this.setCurrent(this.surbubAWithoutGeyserAndStove, this.surbubBWithoutGeyserAndStove);
			this.setAndMakePowerRequest(this.supplyPower, this.surbubACurrent, this.surbubBCurrent);
			this.surplusPower = this.supplyPower - (this.surbubACurrent + this.surbubBCurrent);
		}

		else if (this.surbubANormal + this.surbubBWithoutGeyserAndStove > this.supplyPower) {
			this.deficitPower = (this.surbubANormal + this.surbubBWithoutGeyserAndStove) - this.supplyPower;
			// console.log("Previous Consumption: \n surburbA  -> " + this.surbubANormal + ", \n surburb B -> " + this.surbubBWithoutGeyserAndStove);
			console.log("Previous Consumption: \n surburbA  -> " + this.surbubACurrent + ", \n surburb B -> " + this.surbubBCurrent);
			this.surbubAPrevious = this.surbubACurrent;
			this.surbubBPrevious = this.surbubBCurrent;
			console.log("supply power: " + this.supplyPower);
			console.log("Deficit Power: " + this.deficitPower);
			console.log("Cutting surburb A's geysers");
			console.log("Status: \n surburb B -> geysers and stoves off, \n surburb A -> geysers off");
			this.setDeviceStatus(false, false, true, false, true, true);
			console.log("Current Consumption: \n surburbA  -> " + this.surbubAWithoutGeyser + ", \n surburb B -> " + this.surbubBWithoutGeyserAndStove);
			this.setCurrent(this.surbubAWithoutGeyser, this.surbubBWithoutGeyserAndStove);
			this.setAndMakePowerRequest(this.supplyPower, this.surbubACurrent, this.surbubBCurrent);
			this.surplusPower = this.supplyPower - (this.surbubACurrent + this.surbubBCurrent);
		}

		else if (this.surbubANormal + this.surbubBWithoutGeyser > this.supplyPower) {
			this.deficitPower = (this.surbubANormal + this.surbubBWithoutGeyser) - this.supplyPower;
			// console.log("Previous Consumption: \n surburbA  -> " + this.surbubANormal + ", \n surburb B -> " + this.surbubBWithoutGeyser);
			console.log("Previous Consumption: \n surburbA  -> " + this.surbubACurrent + ", \n surburb B -> " + this.surbubBCurrent);
			this.surbubAPrevious = this.surbubACurrent;
			this.surbubBPrevious = this.surbubBCurrent;
			console.log("supply power: " + this.supplyPower);
			console.log("Deficit Power: " + this.deficitPower);
			console.log("Cutting surburb B's geysers and stoves");
			console.log("Status: \n surburb B -> geysers and stoves off, \n surburb A -> all gadgets on");
			this.setDeviceStatus(true, false, true, false, true, true)
			console.log("Current Consumption: \n surburbA  -> " + this.surbubANormal + ", \n surburb B -> " + this.surbubBWithoutGeyserAndStove);
			this.setCurrent(this.surbubANormal, this.surbubBWithoutGeyserAndStove);
			this.setAndMakePowerRequest(this.supplyPower, this.surbubACurrent, this.surbubBCurrent);
			this.surplusPower = this.supplyPower - (this.surbubACurrent + this.surbubBCurrent);
		}

		else if (this.surbubANormal + this.surbubBNormal > this.supplyPower) {
			this.deficitPower = (this.surbubANormal + this.surbubBNormal) - this.supplyPower;
			// console.log("Previous Consumption: \n surburbA  -> " + this.surbubANormal + ", \n surburb B -> " + this.surbubBNormal);
			console.log("Previous Consumption: \n surburbA  -> " + this.surbubACurrent + ", \n surburb B -> " + this.surbubBCurrent);
			this.surbubAPrevious = this.surbubACurrent;
			this.surbubBPrevious = this.surbubBCurrent;
			console.log("supply power: " + this.supplyPower);
			console.log("Deficit Power: " + this.deficitPower);
			console.log("Cutting surburb B's geysers");
			console.log("Status: \n surburb B -> geysers off, \n surburb A -> all gadgets on");
			this.setDeviceStatus(true, false, true, true, true, true);
			console.log("Current Consumption: \n surburbA  -> " + this.surbubANormal + ", \n surburb B -> " + this.surbubBWithoutGeyser);
			this.setCurrent(this.surbubANormal, this.surbubBWithoutGeyser);
			this.setAndMakePowerRequest(this.supplyPower, this.surbubACurrent, this.surbubBCurrent);
			this.surplusPower = this.supplyPower - (this.surbubACurrent + this.surbubBCurrent);
		}
	}

	processChart() {

		this.chartLabels1 = ['Supply Power', 'Surbub A Consumption', 'Surbub B Consumption'];

		this.chartLabels2.push[this.i.toString()];
		this.i++;

		this.chartDatasets1 = [
			{ data: [this.sliderModel.sliderValue, this.surbubACurrent, this.surbubBCurrent, 0], label: 'Power Production vs Consumption Data' }
		];

		this.dataSupplyPower.push[this.supplyPower];
		this.dataSurbubACons.push[this.surbubACurrent];
		this.dataSurbubBCons.push[this.surbubBCurrent];

		this.chartDatasets2 = [
			{ data: this.dataSupplyPower, label: 'Supply Power' },
			{ data: this.dataSurbubACons, label: 'Surbub A Consumption' },
			{ data: this.dataSurbubBCons, label: 'Surbub B Consumption' },
		];

		console.log(this.chartLabels2);
		console.log(this.chartDatasets2);


		this.chartColors1 = [
			{
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
				],
				borderColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
				],
				borderWidth: 2,
			}
		];

		this.chartColors2 = [
			{
				backgroundColor: 'rgba(105, 0, 132, .2)',
				borderColor: 'rgba(200, 99, 132, .7)',
				borderWidth: 2,
			},
			{
				backgroundColor: 'rgba(0, 137, 132, .2)',
				borderColor: 'rgba(0, 10, 130, .7)',
				borderWidth: 2,
			},
			{
				backgroundColor: 'rgba(80, 37, 92, .2)',
				borderColor: 'rgba(50, 80, 170, .7)',
				borderWidth: 2,
			}
		];

		this.chartOptions = {
			responsive: true
		};
	}

	recreateChart() {
		this.chartDatasets1 = [
			{ data: [this.sliderModel.sliderValue, this.surbubACurrent, this.surbubBCurrent, 0], label: 'Power Production vs Consumption Data' }
		];

		this.chartLabels2.push[this.i.toString()];
		this.i++;

		this.dataSupplyPower.push[this.supplyPower];
		this.dataSurbubACons.push[this.surbubACurrent];
		this.dataSurbubBCons.push[this.surbubBCurrent];

		this.chartDatasets2.forEach(x => {
			x.data = this.dataSupplyPower;
			x.data = this.dataSurbubACons;
			x.data = this.dataSurbubBCons
		});

		// this.chartDatasets2 = [
		// 	{ data: this.dataSupplyPower, label: 'Supply Power' },
		// 	{ data: this.dataSurbubACons, label: 'Surbub A Consumption' },
		// 	{ data: this.dataSurbubBCons, label: 'Surbub B Consumption' },
		// 	0
		// ];

		console.log(this.chartLabels2);
		console.log(this.chartDatasets2);

		this.chartOptions = {
			responsive: true
		};
	}

	public chartClicked1(e: any): void { }
	public chartHovered1(e: any): void { }

}

export class SliderModel {
	sliderValue: number = 90;
	toggleValue: boolean = false;
}

export class DeviceStatusModel {
	surbubAGeyserOn: boolean;
	surbubBGeyserOn: boolean;
	surbubAStoveOn: boolean;
	surbubBStoveOn: boolean;
	surbubAOtherGadgetsOn: boolean;
	surbubBOtherGadgetsOn: boolean;
}