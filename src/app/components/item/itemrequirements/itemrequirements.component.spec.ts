import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRequirementsComponent } from './itemrequirements.component';

describe('ItemRequirementsComponent', () => {
  let component: ItemRequirementsComponent;
  let fixture: ComponentFixture<ItemRequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemRequirementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
