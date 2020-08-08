import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatingChartDataComponent } from './updating-chart-data.component';

describe('UpdatingChartDataComponent', () => {
  let component: UpdatingChartDataComponent;
  let fixture: ComponentFixture<UpdatingChartDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatingChartDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatingChartDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
