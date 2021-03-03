import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListinginfoComponent } from './listinginfo.component';

describe('ListinginfoComponent', () => {
  let component: ListinginfoComponent;
  let fixture: ComponentFixture<ListinginfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListinginfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListinginfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
