import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitasComponent } from './titas.component';

describe('TitasComponent', () => {
  let component: TitasComponent;
  let fixture: ComponentFixture<TitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
