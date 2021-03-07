import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatIconHarness } from '@angular/material/icon/testing';

import { SortarrowComponent } from './sortarrow.component';

describe('SortarrowComponent', () => {
  let component: SortarrowComponent;
  let fixture: ComponentFixture<SortarrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortarrowComponent ],
      imports: [ MatIconModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortarrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component HTML', () => {
    let loader: HarnessLoader;

    beforeEach(() => {
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('should not create the icon if a value is not present', async () => {
      component.sortValue = null;
      await expectAsync(loader.getHarness(MatIconHarness)).toBeRejected();
    });

    it('should have the sortValue as the class on the icon', async () => {
      component.sortValue = 'asc';
      let icon = await loader.getHarness(MatIconHarness);
      let host = await icon.host();
      expect(await host.hasClass('asc')).toBeTrue();
    });

    it('should have the \'arrow_downward\' icon if the sortValue = \'desc\'', async () => {
      component.sortValue = 'desc';
      await expectAsync(loader.getHarness(MatIconHarness.with({name: 'arrow_downward'}))).toBeResolved();
    });

    it('should have the \'arrow_upward\' icon if the sortValue = \'asc\'', async () => {
      component.sortValue = 'asc';
      await expectAsync(loader.getHarness(MatIconHarness.with({name: 'arrow_upward'}))).toBeResolved();
    });    
  });
});
