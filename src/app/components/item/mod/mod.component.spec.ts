import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { currentSortProperties } from 'src/app/models/currentSortProperties';
import { parsedModData } from 'src/app/models/parsedModData';
import { CurrentsortService } from 'src/app/services/currentsort.service';

import { ModComponent } from './mod.component';

class CurrentsortServiceStub {
  public currentSort: BehaviorSubject<currentSortProperties> = new BehaviorSubject<currentSortProperties>({sortKey: '', sortValue: 'asc'});
}

@Component({selector: 'app-sortarrow'})
class SortArrowStub {
  @Input() sortValue: 'asc' | 'desc';
}

describe('ModComponent', () => {
  let component: ModComponent;
  let fixture: ComponentFixture<ModComponent>;
  let currentsortService: CurrentsortService;
  let mockMod: parsedModData = { 
    name: null,
    text: null,
    tiers: [],
    hash: null
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModComponent, SortArrowStub ],
      providers: [
        {provide: CurrentsortService, useClass: CurrentsortServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModComponent);
    component = fixture.componentInstance;
    component.mod = mockMod;
    fixture.detectChanges();

    currentsortService = TestBed.inject(CurrentsortService);
  });

  describe('Component HTML', ()=> {

    describe('Mod Container', () => {
      afterEach(() => {
        mockMod.hash = null;
        fixture.detectChanges();
      })

      it('should have the \'sortable\' class if the hash exists on the mod', () => {
        mockMod.hash = "mockhash";
        fixture.detectChanges();
        let modContEl = fixture.debugElement.query(By.css('.sortable'));

        expect(modContEl).toBeTruthy();
      });

      it('should not have the \'sortable\' class if the hash doesn\'t exists on the mod', () => {
        let modContEl = fixture.debugElement.query(By.css('.sortable'));

        expect(modContEl).toBeFalsy();
      });

      it('should call next with {sortKey: \'stat.mockhash\'} on the currentSort behaviorSubject if the hash exists on the mod', () => {
        spyOn(component.currentSort.currentSort, 'next');
        mockMod.hash = "mockhash";
        fixture.detectChanges();
        let modContEl = fixture.debugElement.query(By.css('.sortable'));
        modContEl.triggerEventHandler('click', {});
        expect(component.currentSort.currentSort.next).toHaveBeenCalledWith({sortKey: 'stat.mockhash'});
      });

      it('should not call next on the currentSort behaviorSubject if the hash does not exist on the mod', () => {
        spyOn(component.currentSort.currentSort, 'next');
        let modContEl = fixture.debugElement.query(By.css('.mod-container'));
        modContEl.triggerEventHandler('click', {});
        expect(component.currentSort.currentSort.next).not.toHaveBeenCalled();
      });
    });

    describe('Mod Text Element', () => {

      it('should have text content equal to the mod text', () => {
        mockMod.text = "Mock mod";
        fixture.detectChanges();
        let modTextEl = fixture.debugElement.query(By.css('span'));

        expect(modTextEl.nativeElement.textContent).toEqual('Mock mod');
      });
    });

    describe('Sort Arrow Component', () => {

      afterEach(() => {
        mockMod.hash = null;
      });

      it('should not exist if the currentSort.sortValue does not equal \'stat.\' + mod.hash', () => {
        let sortArrComp = fixture.debugElement.query(By.css('app-sortarrow'));
        expect(sortArrComp).toBeFalsy();
      });

      it('should set the sortValue input to the currentSort sortValue', () => {
        mockMod.hash = "mockhash";
        component.currentSort.currentSort.next({sortKey: "stat.mockhash", sortValue: 'desc'});
        fixture.detectChanges();

        let sortArrComp = fixture.debugElement.query(By.css('app-sortarrow')).componentInstance as SortArrowStub;
        expect(sortArrComp.sortValue).toEqual('desc');
      });
    });

    describe('Mod Tiers', () => {

      beforeEach(() => {
        mockMod.tiers = [
          {
            tier: 'M1',
            ranges: [
              {min: 1, max: 100}, {min: 200, max: 200}
            ]
          },
          {
            tier: 'M2',
            ranges: []
          }
        ];

        mockMod.name = "Mock Mod Name";
        fixture.detectChanges();
      });

      it('should contain divs in .tiers equal to the number of tiers', () => {
        let tiers = fixture.debugElement.query(By.css('.tiers')).queryAll(By.css('div'));
        expect(tiers.length).toEqual(2);
      });

      it('has correct text content in each tier div', () => {
        const firstTierDivContent = "M1 [1 - 100, 200]"
        const secondTierDivContent = " + M2";
        let tiers = fixture.debugElement.query(By.css('.tiers')).queryAll(By.css('div'));
        
        expect(tiers[0].nativeElement.textContent).toContain(firstTierDivContent);
        expect(tiers[1].nativeElement.textContent).toContain(secondTierDivContent);
      });

      it('should have the mod name displayed if the mod name exists', () => {
        let modNameEl = fixture.debugElement.queryAll(By.css('.mod-detail')).pop();
        expect(modNameEl.nativeElement.textContent).toEqual(mockMod.name);
      });

      it('should not have the mod name displayed if the mod name exists', () => {
        mockMod.name = null;
        fixture.detectChanges();
        let modNameEl = fixture.debugElement.queryAll(By.css('.mod-detail')).pop();
        expect(modNameEl.nativeElement.textContent).not.toEqual(mockMod.name);
      });
    });
  });
});
