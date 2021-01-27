import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherfiltersComponent } from './otherfilters.component';

describe('OtherfiltersComponent', () => {
  let component: OtherfiltersComponent;
  let fixture: ComponentFixture<OtherfiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherfiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherfiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
