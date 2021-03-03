import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemheaderComponent } from './itemheader.component';

describe('ItemheaderComponent', () => {
  let component: ItemheaderComponent;
  let fixture: ComponentFixture<ItemheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
