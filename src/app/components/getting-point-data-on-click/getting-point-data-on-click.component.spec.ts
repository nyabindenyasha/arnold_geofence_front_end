import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GettingPointDataOnClickComponent } from './getting-point-data-on-click.component';

describe('GettingPointDataOnClickComponent', () => {
  let component: GettingPointDataOnClickComponent;
  let fixture: ComponentFixture<GettingPointDataOnClickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GettingPointDataOnClickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GettingPointDataOnClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
