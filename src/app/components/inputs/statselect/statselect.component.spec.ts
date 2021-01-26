import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatselectComponent } from './statselect.component';

describe('StatselectComponent', () => {
  let component: StatselectComponent;
  let fixture: ComponentFixture<StatselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatselectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
