import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GemfiltersComponent } from './gemfilters.component';

describe('GemfiltersComponent', () => {
  let component: GemfiltersComponent;
  let fixture: ComponentFixture<GemfiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GemfiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GemfiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
