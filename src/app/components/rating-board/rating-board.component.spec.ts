import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingBoardComponent } from './rating-board.component';

describe('RatingBoardComponent', () => {
  let component: RatingBoardComponent;
  let fixture: ComponentFixture<RatingBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
