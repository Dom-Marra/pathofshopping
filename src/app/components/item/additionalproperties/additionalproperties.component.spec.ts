import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalpropertiesComponent } from './additionalproperties.component';

describe('AdditionalpropertiesComponent', () => {
  let component: AdditionalpropertiesComponent;
  let fixture: ComponentFixture<AdditionalpropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalpropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalpropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
