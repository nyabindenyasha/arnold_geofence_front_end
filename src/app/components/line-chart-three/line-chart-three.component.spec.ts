import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartThreeComponent } from './line-chart-three.component';

describe('LineChartThreeComponent', () => {
  let component: LineChartThreeComponent;
  let fixture: ComponentFixture<LineChartThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
