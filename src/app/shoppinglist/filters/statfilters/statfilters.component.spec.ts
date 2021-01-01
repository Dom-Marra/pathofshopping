import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatfiltersComponent } from './statfilters.component';

describe('StatfiltersComponent', () => {
  let component: StatfiltersComponent;
  let fixture: ComponentFixture<StatfiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatfiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatfiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
