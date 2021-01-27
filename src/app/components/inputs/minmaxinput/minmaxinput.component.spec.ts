import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinmaxinputComponent } from './minmaxinput.component';

describe('MinmaxinputComponent', () => {
  let component: MinmaxinputComponent;
  let fixture: ComponentFixture<MinmaxinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinmaxinputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinmaxinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
