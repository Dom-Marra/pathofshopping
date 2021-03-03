import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalvaluesComponent } from './totalvalues.component';

describe('TotalvaluesComponent', () => {
  let component: TotalvaluesComponent;
  let fixture: ComponentFixture<TotalvaluesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalvaluesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalvaluesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
