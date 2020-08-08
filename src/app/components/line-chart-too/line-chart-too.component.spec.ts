import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartTooComponent } from './line-chart-too.component';

describe('LineChartTooComponent', () => {
  let component: LineChartTooComponent;
  let fixture: ComponentFixture<LineChartTooComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartTooComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartTooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
