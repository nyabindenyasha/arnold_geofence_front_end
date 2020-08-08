import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerBalancingHomeComponent } from './power-balancing-home.component';

describe('PowerBalancingHomeComponent', () => {
  let component: PowerBalancingHomeComponent;
  let fixture: ComponentFixture<PowerBalancingHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerBalancingHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerBalancingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
