import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradefiltersComponent } from './tradefilters.component';

describe('TradefiltersComponent', () => {
  let component: TradefiltersComponent;
  let fixture: ComponentFixture<TradefiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradefiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradefiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
