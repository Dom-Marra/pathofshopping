import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteractionbuttonsComponent } from './filteractionbuttons.component';

describe('FilteractionbuttonsComponent', () => {
  let component: FilteractionbuttonsComponent;
  let fixture: ComponentFixture<FilteractionbuttonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteractionbuttonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteractionbuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
