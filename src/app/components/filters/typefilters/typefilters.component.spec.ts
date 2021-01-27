import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypefiltersComponent } from './typefilters.component';

describe('TypefiltersComponent', () => {
  let component: TypefiltersComponent;
  let fixture: ComponentFixture<TypefiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypefiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypefiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
