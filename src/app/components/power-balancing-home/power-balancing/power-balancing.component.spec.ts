import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerBalancingComponent } from './power-balancing.component';

describe('PowerBalancingComponent', () => {
  let component: PowerBalancingComponent;
  let fixture: ComponentFixture<PowerBalancingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerBalancingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerBalancingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
