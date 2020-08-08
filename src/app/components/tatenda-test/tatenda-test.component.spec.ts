import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TatendaTestComponent } from './tatenda-test.component';

describe('TatendaTestComponent', () => {
  let component: TatendaTestComponent;
  let fixture: ComponentFixture<TatendaTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TatendaTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TatendaTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
