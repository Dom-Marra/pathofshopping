import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketfiltersComponent } from './socketfilters.component';

describe('SocketfiltersComponent', () => {
  let component: SocketfiltersComponent;
  let fixture: ComponentFixture<SocketfiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocketfiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketfiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
