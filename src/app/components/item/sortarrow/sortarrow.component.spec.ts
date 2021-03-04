import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortarrowComponent } from './sortarrow.component';

describe('SortarrowComponent', () => {
  let component: SortarrowComponent;
  let fixture: ComponentFixture<SortarrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortarrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortarrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
