import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatIconHarness } from '@angular/material/icon/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { modProperties } from 'src/app/item/models/modProperties';
import { queryProps } from '../core/classes/resultdata';
import { PoeService } from '../core/services/poe.service';

import { ItemComponent } from './item.component';

@Component({selector: 'item-image'})
class ImageStub { @Input() item: any; }

@Component({selector: 'item-header'})
class HeaderStub { @Input() item: any; }

@Component({selector: 'item-properties'})
class PropertiesStub { @Input() item: any; }

@Component({selector: 'item-requirements'})
class RequirementsStub { @Input() item: any; }

@Component({selector: 'item-modlist', template: `<ng-content></ng-content>`})
class ModListStub { 
  @Input() item: any; 
  @Input() modProperties: modProperties[];
}

@Component({selector: 'item-divmods'})
class DivModsStub { @Input() explicitMods: any; }

@Component({selector: 'item-additionalproperties'})
class AdditionalPropertiesStub { @Input() additionalProperties: any; }

@Component({selector: 'item-incubator'})
class IncubatorStub { @Input() incubatedItem: any; }

@Component({selector: 'item-totalvalues'})
class TotalValuesStub { @Input() extended: any; }

@Component({selector: 'item-listinginfo'})
class ListingInfoStub { @Input() listing: any; }

class PoeServiceStub {
  public fetch(items: Array<string>, endingParams?: string) {
    return of({});
  }
}

describe('ItemComponent', () => {
  let item = { 
    item: {
      extended: {}
    },
    listing: { }
  };
  let mockQueryProps: queryProps = {
    id: 'mockID',
    res: [],
    psuedos: 'mockPseudos',
    inexact: false,
    total: 1
  };
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let poeService: PoeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemComponent, ImageStub, HeaderStub, PropertiesStub, RequirementsStub,
                      ModListStub, DivModsStub, AdditionalPropertiesStub, IncubatorStub, TotalValuesStub, ListingInfoStub ],
      providers: [
        {provide: PoeService, useClass: PoeServiceStub}
      ],
      imports: [MatButtonModule, MatIconModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.item = item;
    component.queryProps = mockQueryProps;

    fixture.detectChanges();
    poeService = TestBed.inject(PoeService);
  });

  describe('Class Functions', () => {

    describe('Refresh', () => {
      afterEach(() => {
        component.queryProps = mockQueryProps;
        item['id'] = null;
        component.item = item;
        item.listing['copied'] = null;
      });

      it('does not call the poe service if the queryProps are null', () => {
        spyOn(poeService, 'fetch');
        component.queryProps = null;
        component.refresh();

        expect(poeService.fetch).not.toHaveBeenCalled();
      });

      it('calls te poe service fetch method with proper params', () => {
        spyOn(poeService, 'fetch').and.returnValue(of({
          result: [{}]
        }));

        item['id'] = 'mockID';
        component.refresh();
        expect(poeService.fetch).toHaveBeenCalledWith(['mockID'], "?query=mockID&mockPseudos");
      });

      it('sets the item as the item from the fetch', () => {
        spyOn(poeService, 'fetch').and.returnValue(of({
          result: [{
            mockProp: 'mockValue'
          }]
        }));

        item['id'] = 'mockID';
        component.refresh();
        expect(component.item).toEqual({mockProp: 'mockValue'});
      });

      it('keeps the item listing copied property if its true', () => {
        spyOn(poeService, 'fetch').and.returnValue(of({
          result: [{
            mockProp: 'mockValue',
            listing: {}
          }]
        }));

        item['id'] = 'mockID';
        item.listing['copied'] = true;
        component.refresh();
        expect(component.item).toEqual({mockProp: 'mockValue', listing: {copied: true}});
      });
    });
  });

  describe('Component HTML', () => {
    let loader: HarnessLoader;

    beforeEach(() => {
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    describe('Item Container', () => {

      afterEach(() => {
        item['gone'] = null;
      });

      it('has class \'gone\' when the item gone property is true', () => {
        item['gone'] = true;
        fixture.detectChanges();
        let itemCont = fixture.debugElement.query(By.css('.item-container'));
        expect(itemCont.classes).toEqual(jasmine.objectContaining({'gone': true}));
      });
    });

    describe('Refresh Button', () => {
      let matButton: MatButtonHarness;

      beforeEach(async () => {
        matButton = await loader.getHarness(MatButtonHarness);
      });

      it('calls refresh on click', async () => {
        spyOn(component, 'refresh');
        await matButton.click();
        
        expect(component.refresh).toHaveBeenCalled();
      });
    });

    describe('refresh icon', () => {
      let icon: MatIconHarness

      beforeEach(async () => {
        icon = await loader.getHarness(MatIconHarness);
      });

      afterEach(() => {
        component.refreshing = false;
      });

      it('has refreshing class when the refreshing value is true', async () => {
        component.refreshing = true;
        let iconHost = await icon.host();
        expect(await iconHost.hasClass('refreshing')).toBeTrue();
      });
    });

    describe('Item Image Component', () => {

      it('should use the item.item as input', () => {
        let itemImageComp = fixture.debugElement.query(By.css('item-image')).componentInstance as ImageStub;
        expect(itemImageComp.item).toEqual(component.item.item);
      });
    });

    describe('item-box element', () => {

      it('should have a class with the item.item.frameType value prefixed with \'rarity-\'', () => {
        item.item['frameType'] = 0;
        fixture.detectChanges();
        let itemBoxEl = fixture.debugElement.query(By.css('.rarity-0'));
        expect(itemBoxEl).toBeTruthy();
      });
    });

    describe('Item Header Component', () => {

      it('should use the item.item as input', () => {
        let itemHeaderComp = fixture.debugElement.query(By.css('item-header')).componentInstance as HeaderStub;
        expect(itemHeaderComp.item).toEqual(component.item.item);
      });
    });

    describe('Properties Component', () => {

      afterEach(() => {
        item.item['properties'] = null;
        fixture.detectChanges();
      })

      it('should exist if the item properties is present and has values', () => {
        item.item['properties'] = ['MockValue'];
        fixture.detectChanges();
        let propComp = fixture.debugElement.query(By.css('item-properties'));

        expect(propComp).toBeTruthy();
      });

      it('should not exist if the item properties is not present', () => {
        let propComp = fixture.debugElement.query(By.css('item-properties'));

        expect(propComp).toBeFalsy();
      });

      it('should use the item.item as input', () => {
        item.item['properties'] = ['MockValue'];
        fixture.detectChanges();
        let propComp = fixture.debugElement.query(By.css('item-properties')).componentInstance as PropertiesStub;

        expect(propComp.item).toEqual(component.item.item);
      });
    });

    describe('Item Requirements Component', () => {

      afterEach(() => {
        item.item['ilvl'] = null;
        item.item['requirements'] = null;
        item.item['talismanTier'] = null;
        fixture.detectChanges();
      })

      it('should exist if the item.item.ilvl exists', () => {
        item.item['ilvl'] = 1;
        fixture.detectChanges();
        let reqComp = fixture.debugElement.query(By.css('item-requirements'));

        expect(reqComp).toBeTruthy();
      });

      it('should exist if the item.item.requirements exists', () => {
        item.item['requirements'] = ['MockValue'];
        fixture.detectChanges();
        let reqComp = fixture.debugElement.query(By.css('item-requirements'));

        expect(reqComp).toBeTruthy();
      });

      it('should exist if the item.item.talismanTier exists', () => {
        item.item['talismanTier'] = 1;
        fixture.detectChanges();
        let reqComp = fixture.debugElement.query(By.css('item-requirements'));

        expect(reqComp).toBeTruthy();
      });

      it('should not exist if the item.item.talismanTier, item.item.ilvl, and item.item.requirements is not present', () => {
        let reqComp = fixture.debugElement.query(By.css('item-requirements'));

        expect(reqComp).toBeFalsy();
      });

      it('should use the item.item as input', () => {
        item.item['talismanTier'] = 1;
        fixture.detectChanges();
        let reqComp = fixture.debugElement.query(By.css('item-requirements')).componentInstance as RequirementsStub;

        expect(reqComp.item).toEqual(component.item.item);
      });
    });

    describe('Enchant Mods List', () => {

      afterEach(() => {
        item.item['enchantMods'] = null;
        fixture.detectChanges();
      });

      it('should exist if the item.item.enchantMods has values', () => {
        item.item['enchantMods'] = ['MockValue'];
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('item-modlist'));

        expect(modlistComp).toBeTruthy();
      });

      it('should not exist if the item.item.enchantMods is empty/null', () => {
        let modlistComp = fixture.debugElement.query(By.css('item-modlist'));

        expect(modlistComp).toBeFalsy();
      });

      it('should use the item.item as the item input', () => {
        item.item['enchantMods'] = ['MockValue'];
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('item-modlist')).componentInstance as ModListStub;

        expect(modlistComp.item).toEqual(component.item.item);
      });

      it('should use the enchantModProperties as the modProperties input', () => {
        item.item['enchantMods'] = ['MockValue'];
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('item-modlist')).componentInstance as ModListStub;

        expect(modlistComp.modProperties).toEqual(component.enchantModProperties);
      });
    });

    describe('Implicit Mods List', () => {

      afterEach(() => {
        item.item['implicitMods'] = null;
        fixture.detectChanges();
      });

      it('should exist if the item.item.implicitMods has values', () => {
        item.item['implicitMods'] = ['MockValue'];
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('item-modlist'));

        expect(modlistComp).toBeTruthy();
      });

      it('should not exist if the item.item.implicitMods is empty/null', () => {
        let modlistComp = fixture.debugElement.query(By.css('item-modlist'));

        expect(modlistComp).toBeFalsy();
      });

      it('should use the item.item as the item input', () => {
        item.item['implicitMods'] = ['MockValue'];
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('item-modlist')).componentInstance as ModListStub;

        expect(modlistComp.item).toEqual(component.item.item);
      });

      it('should use the implicitModProperties as the modProperties input', () => {
        item.item['implicitMods'] = ['MockValue'];
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('item-modlist')).componentInstance as ModListStub;

        expect(modlistComp.modProperties).toEqual(component.implicitModProperties);
      });
    });

    describe('Explicit Mods List', () => {

      afterEach(() => {
        item.item['explicitMods'] = null;
        item.item['fracturedMods'] = null;
        item.item['craftedMods'] = null;
        item.item['corrupted'] = null;
        item.item['duplicated'] = null;
        item.item['frameType'] = 6;
        item.item['hybrid'] = null;
        fixture.detectChanges();
      });

      it('should exist if the item.item.explicitMods has values and the item.item.frameType is not 6', () => {
        item.item['explicitMods'] = ['MockValue'];
        item.item['frameType'] = 0;
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('item-modlist'));

        expect(modlistComp).toBeTruthy();
      });

      it('should exist if the item.item.fracturedMods has values and the item.item.frameType is not 6', () => {
        item.item['fracturedMods'] = ['MockValue'];
        item.item['frameType'] = 0;
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('item-modlist'));

        expect(modlistComp).toBeTruthy();
      });

      it('should exist if the item.item.craftedMods has values and the item.item.frameType is not 6', () => {
        item.item['craftedMods'] = ['MockValue'];
        item.item['frameType'] = 0;
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('item-modlist'));

        expect(modlistComp).toBeTruthy();
      });

      it('should exist if the item.item.corrupted is not null and the item.item.frameType is not 6', () => {
        item.item['corrupted'] = true;
        item.item['frameType'] = 0;
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('item-modlist'));

        expect(modlistComp).toBeTruthy();
      });

      it('should exist if the item.item.duplicated is not null and the item.item.frameType is not 6', () => {
        item.item['duplicated'] = true;
        item.item['frameType'] = 0;
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('item-modlist'));

        expect(modlistComp).toBeTruthy();
      });

      it('should not exist if the item.item.implicitMods, item.item.fracturedMods, item.item.craftedMods, item.item.corrupted, and item.item.duplicated is empty/null', () => {
        let modlistComp = fixture.debugElement.query(By.css('item-modlist'));

        expect(modlistComp).toBeFalsy();
      });

      it('should not exist if the item.item.frameType equals 6', () => {
        item.item['explicitMods'] = ['MockValue'];
        item.item['fracturedMods'] = ['MockValue'];
        item.item['craftedMods'] = ['MockValue'];
        item.item['corrupted'] = ['MockValue'];
        item.item['duplicated'] = ['MockValue'];
        item.item['frameType'] = 6;
        fixture.detectChanges()
        let modlistComp = fixture.debugElement.query(By.css('item-modlist'));

        expect(modlistComp).toBeFalsy();
      });

      it('should use the item.item as the item input', () => {
        item.item['explicitMods'] = ['MockValue'];
        item.item['frameType'] = 0;
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('item-modlist')).componentInstance as ModListStub;

        expect(modlistComp.item).toEqual(component.item.item);
      });

      it('should use the implicitModProperties as the modProperties input', () => {
        item.item['explicitMods'] = ['MockValue'];
        item.item['frameType'] = 0;
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('item-modlist')).componentInstance as ModListStub;

        expect(modlistComp.modProperties).toEqual(component.explicitModProperties);
      });

      it('should have a p element with text content \'Corrupted\' if the item.item.corrupted is true and the item is not a vaal gem', () => {
        item.item['corrupted'] = true;
        item.item['frameType'] = 0;
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('item-modlist'));
        let corruptedP = modlistComp.query(By.css('p'));

        expect(corruptedP.nativeElement.textContent).toEqual('Corrupted');
      });

      it('does not have a p element with text content \'Corrupted\' if the item.item.corrupted is true and the item is a vaal gem', () => {
        item.item['corrupted'] = true;
        item.item['frameType'] = 0;
        item.item['hybrid'] = {
          isVaalGem: true
        }
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('item-modlist'));
        let corruptedP = modlistComp.query(By.css('.corrupted'));

        expect(corruptedP).toBeFalsy();
      });

      it('should have a p element with text content \'Mirrored\' if the item.item.duplicated is true', () => {
        item.item['duplicated'] = true;
        item.item['frameType'] = 0;
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('item-modlist'));
        let corruptedP = modlistComp.query(By.css('p'));

        expect(corruptedP.nativeElement.textContent).toEqual('Mirrored');
      });
    });

    describe('Hybrid Details', () => {

      afterEach(() => {
        item.item['hybrid'] = null;
        item.item['typeLine'] = null;
        item.item['corrupted'] = null;
      });

      it('should not exist if the hybrid property is null on the item', () => {
        expect(fixture.debugElement.query(By.css('.hybrid'))).toBeFalsy();
      });

      it('contains a header with the items typLine as the content', () => {
        item.item['hybrid'] = {}
        item.item['typeLine'] = "Mock TypeLine"
        fixture.detectChanges();

        let header = fixture.debugElement.query(By.css('.hybrid-item-name'));
        expect(header.nativeElement.textContent).toContain("Mock TypeLine");
      });

      it('contains the item properties component with proper bindings when the hybrid property has properties property', () => {
        item.item['hybrid'] = {
          properties: {}
        };
        fixture.detectChanges();

        let hybridDetails = fixture.debugElement.query(By.css('.hybrid'));
        let properties = hybridDetails.query(By.css('item-properties'));
        expect(properties).toBeTruthy();
        expect((properties.componentInstance as PropertiesStub).item).toEqual(item.item['hybrid']);
      });

      it('contains the item modlist component with proper bindings when the hybrid property has explicitMods property', () => {
        item.item['hybrid'] = {
          explicitMods: {}
        };
        fixture.detectChanges();

        let hybridDetails = fixture.debugElement.query(By.css('.hybrid'));
        let modlist = hybridDetails.query(By.css('item-modlist'));
        expect(modlist).toBeTruthy();
        expect((modlist.componentInstance as ModListStub).item).toEqual(item.item['hybrid']);
        expect((modlist.componentInstance as ModListStub).modProperties).toEqual(component.explicitModProperties);
      });

      it('has a p element with text content \'Corrupted\' if the item.item.corrupted is true and the item is a vaal gem', () => {
        item.item['corrupted'] = true;
        item.item['hybrid'] = {
          explicitMods: {},
          isVaalGem: true
        }
        fixture.detectChanges();
        let hybridDetails = fixture.debugElement.query(By.css('.hybrid'));
        let modlist = hybridDetails.query(By.css('item-modlist'));
        let corruptedP = modlist.query(By.css('.corrupted'));

        expect(corruptedP.nativeElement.textContent).toEqual('Corrupted');
      });
    });

    describe('Div Mods Component', () => {

      afterEach(() => {
        item.item['frameType'] = -1;
        item.item['explicitMods'] = null;
        fixture.detectChanges();
      });

      it('should not exist if the item.item.frameType is not 6', () => {
        item.item['explicitMods'] = ['MockValue'];
        fixture.detectChanges();
        let divModsComp = fixture.debugElement.query(By.css('item-divmods'));

        expect(divModsComp).toBeFalsy();
      });

      it('should not exist if the item.item.explicitMods is empty/null', () => {
        item.item['frameType'] = 6;
        fixture.detectChanges();
        let divModsComp = fixture.debugElement.query(By.css('item-divmods'));

        expect(divModsComp).toBeFalsy();
      });

      it('should use item.item as the item input', () => {
        item.item['frameType'] = 6;
        item.item['explicitMods'] = ['MockValue'];
        fixture.detectChanges();
        let divModsComp = fixture.debugElement.query(By.css('item-divmods')).componentInstance as DivModsStub;

        expect(divModsComp.explicitMods).toEqual(component.item.item['explicitMods']);
      });
    });

    describe('Unidentified Text', () => {

      afterEach(() => {
        item.item['identified'] = null;
        fixture.detectChanges();
      });

      it('should not exist if the item.item.identified is false/null', () => {
        let unIDEl = fixture.debugElement.query(By.css('.item-detail'));

        expect(unIDEl).toBeFalsy();
      });
    });

    describe('Prophecy Text', () => {

      afterEach(() => {
        item.item['prophecyText'] = null;
        fixture.detectChanges();
      });

      it('should not exist if the item.item.prophecyText is null', () => {
        let prophTextEl = fixture.debugElement.query(By.css('.item-detail'));

        expect(prophTextEl).toBeFalsy();
      });

      it('should contain item.item.prophecyText as text content', () => {
        item.item['prophecyText'] = 'Mock Value';
        fixture.detectChanges();
        let prophTextEl = fixture.debugElement.query(By.css('.item-detail'));

        expect(prophTextEl.nativeElement.textContent).toEqual(component.item.item.prophecyText);
      });
    });

    describe('Additional Properties Component', () => {
      
      afterEach(() => {
        item.item['additionalProperties'] = null;
        fixture.detectChanges();
      });

      it('should not exist if the item.item.additionalProperties is null', () => {
        let addPropsComp = fixture.debugElement.query(By.css('item-additionalproperties'));

        expect(addPropsComp).toBeFalsy();
      });

      it('should use item.item as the item input', () => {
        item.item['additionalProperties'] = ['Mock Value'];
        fixture.detectChanges();
        let addPropsComp = fixture.debugElement.query(By.css('item-additionalproperties')).componentInstance as AdditionalPropertiesStub;

        expect(addPropsComp.additionalProperties).toEqual(component.item.item['additionalProperties']);
      });
    });

    describe('Incubator Component', () => {
      afterEach(() => {
        item.item['incubatedItem'] = null;
        fixture.detectChanges();
      });

      it('should not exist if the item.item.incubatedItem is null', () => {
        let incComp = fixture.debugElement.query(By.css('item-incubator'));

        expect(incComp).toBeFalsy();
      });

      it('should use item.item as the item input', () => {
        item.item['incubatedItem'] = 'Mockvalue';
        fixture.detectChanges();
        let incComp = fixture.debugElement.query(By.css('item-incubator')).componentInstance as IncubatorStub;

        expect(incComp.incubatedItem).toEqual(component.item.item['incubatedItem']);
      });
    });

    describe('Total Values Component', () => {
      afterEach(() => {
        item.item.extended['dps'] = null;
        item.item.extended['edps'] = null;
        item.item.extended['pdps'] = null;
        item.item.extended['ar'] = null;
        item.item.extended['ev'] = null;
        item.item.extended['es'] = null;
        fixture.detectChanges();
      });

      it('should not exist if the item.item.extended.edps, item.item.extended.pdps, item.item.extended.ar, item.item.extended.ev, item.item.extended.dps, and item.item.extended.es is null', () => {
        let totalValComp = fixture.debugElement.query(By.css('item-totalvalues'));

        expect(totalValComp).toBeFalsy();
      });

      it('should exist if the item.item.extended.dps exists', () => {
        item.item.extended['dps'] = 1;
        fixture.detectChanges();
        let totalValComp = fixture.debugElement.query(By.css('item-totalvalues'));

        expect(totalValComp).toBeTruthy();
      });

      it('should exist if the item.item.extended.pdps exists', () => {
        item.item.extended['pdps'] = 1;
        fixture.detectChanges();
        let totalValComp = fixture.debugElement.query(By.css('item-totalvalues'));

        expect(totalValComp).toBeTruthy();
      });

      it('should exist if the item.item.extended.edps exists', () => {
        item.item.extended['edps'] = 1;
        fixture.detectChanges();
        let totalValComp = fixture.debugElement.query(By.css('item-totalvalues'));

        expect(totalValComp).toBeTruthy();
      });

      it('should exist if the item.item.extended.ar exists', () => {
        item.item.extended['ar'] = 1;
        fixture.detectChanges();
        let totalValComp = fixture.debugElement.query(By.css('item-totalvalues'));

        expect(totalValComp).toBeTruthy();
      });

      it('should exist if the item.item.extended.ev exists', () => {
        item.item.extended['ev'] = 1;
        fixture.detectChanges();
        let totalValComp = fixture.debugElement.query(By.css('item-totalvalues'));

        expect(totalValComp).toBeTruthy();
      });

      it('should exist if the item.item.extended.es exists', () => {
        item.item.extended['es'] = 1;
        fixture.detectChanges();
        let totalValComp = fixture.debugElement.query(By.css('item-totalvalues'));

        expect(totalValComp).toBeTruthy();
      });

      it('should use item.item as the item input', () => {
        item.item.extended['es'] = 1;
        fixture.detectChanges();
        let totalValComp = fixture.debugElement.query(By.css('item-totalvalues')).componentInstance as TotalValuesStub;

        expect(totalValComp.extended).toEqual(component.item.item['extended']);
      });
    });

    describe('Listing Info Component', () => {

      it('should use item.listing as the listing input', () => {
        let listingComp = fixture.debugElement.query(By.css('item-listinginfo')).componentInstance as ListingInfoStub;

        expect(listingComp.listing).toEqual(component.item.listing);
      });
    });
  });
});
