import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmourfiltersComponent } from './armourfilters.component';

describe('ArmourfiltersComponent', () => {
  let component: ArmourfiltersComponent;
  let fixture: ComponentFixture<ArmourfiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmourfiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmourfiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
