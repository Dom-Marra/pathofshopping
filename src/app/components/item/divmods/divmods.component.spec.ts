import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivmodsComponent } from './divmods.component';

describe('DivmodsComponent', () => {
  let component: DivmodsComponent;
  let fixture: ComponentFixture<DivmodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivmodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivmodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
