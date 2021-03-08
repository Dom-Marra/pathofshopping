import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';
import {MatProgressBarHarness} from '@angular/material/progress-bar/testing';

import { IncubatorComponent } from './incubator.component';

describe('IncubatorComponent', () => {
  let component: IncubatorComponent;
  let fixture: ComponentFixture<IncubatorComponent>;
  let mockIncubatedItem = {
    progress: 1,
    total: 100,
    level: 10,
    name: "Mock Incubator"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncubatorComponent ],
      imports: [ MatProgressBarModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncubatorComponent);
    component = fixture.componentInstance;
    component.incubatedItem = mockIncubatedItem;
    fixture.detectChanges();
  });

  describe('Component HTML', () => {

    describe('Incubator Progress Span', () => {

      it('displays the progress correctly', () => {
        let progressSpan = fixture.debugElement.query(By.css('.display-0'));
        expect(progressSpan.nativeElement.textContent).toContain('1/100');
      });
    });

    describe('Incubator Name and level Span', () => {

      it('should display the information correctly', () => {
        let progressSpan = fixture.debugElement.queryAll(By.css('span'))[1];
        expect(progressSpan.nativeElement.textContent).toContain('level: 10 Mock Incubator');
      });
    });

    describe('Incubator Progress Bar', () => {
      let matProgressBar: MatProgressBarHarness;

      beforeEach(async () => {
        let loader = TestbedHarnessEnvironment.loader(fixture);
        matProgressBar = await loader.getHarness(MatProgressBarHarness);
      });

      it('has its progress = (incubatedItem.progress / incubatedItem.total) * 100', async () => {
        expect(await matProgressBar.getValue()).toEqual(1);
      });
    });
  });
});
