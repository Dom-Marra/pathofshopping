import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltergroupselectComponent } from './filtergroupselect.component';

describe('FiltergroupselectComponent', () => {
  let component: FiltergroupselectComponent;
  let fixture: ComponentFixture<FiltergroupselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltergroupselectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltergroupselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
