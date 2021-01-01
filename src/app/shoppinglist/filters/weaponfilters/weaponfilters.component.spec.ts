import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponfiltersComponent } from './weaponfilters.component';

describe('WeaponfiltersComponent', () => {
  let component: WeaponfiltersComponent;
  let fixture: ComponentFixture<WeaponfiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeaponfiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponfiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
