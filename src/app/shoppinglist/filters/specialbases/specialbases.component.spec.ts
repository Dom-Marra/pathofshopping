import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialbasesComponent } from './specialbases.component';

describe('SpecialbasesComponent', () => {
  let component: SpecialbasesComponent;
  let fixture: ComponentFixture<SpecialbasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialbasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialbasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
