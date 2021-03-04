import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { modProperties } from 'src/app/models/modProperties';

import { ItemComponent } from './item.component';

@Component({selector: 'app-itemimage'})
class ItemImageStub { @Input() item: any; }

@Component({selector: 'app-itemheader'})
class ItemHeaderStub { @Input() item: any; }

@Component({selector: 'app-properties'})
class PropertiesStub { @Input() item: any; }

@Component({selector: 'app-itemrequirements'})
class ItemRequirementsStub { @Input() item: any; }

@Component({selector: 'app-modlist', template: `<ng-content></ng-content>`})
class ModListStub { 
  @Input() item: any; 
  @Input() modProperties: modProperties[];
}

@Component({selector: 'app-divmods'})
class DivModsStub { @Input() explicitMods: any; }

@Component({selector: 'app-additionalproperties'})
class AdditionalPropertiesStub { @Input() additionalProperties: any; }

@Component({selector: 'app-incubator'})
class IncubatorStub { @Input() incubatedItem: any; }

@Component({selector: 'app-totalvalues'})
class TotalValuesStub { @Input() extended: any; }

@Component({selector: 'app-listinginfo'})
class ListingInfoStub { @Input() listing: any; }

describe('ItemComponent', () => {
  let item = { 
    item: {
      extended: {}
    },
    listing: { }
  };
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemComponent, ItemImageStub, ItemHeaderStub, PropertiesStub, ItemRequirementsStub,
                      ModListStub, DivModsStub, AdditionalPropertiesStub, IncubatorStub, TotalValuesStub, ListingInfoStub ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.item = item;

    fixture.detectChanges();
  });

  describe('Component HTML', () => {

    describe('Item Image Component', () => {

      it('should use the item.item as input', () => {
        let itemImageComp = fixture.debugElement.query(By.css('app-itemimage')).componentInstance as ItemImageStub;
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
        let itemHeaderComp = fixture.debugElement.query(By.css('app-itemheader')).componentInstance as ItemHeaderStub;
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
        let propComp = fixture.debugElement.query(By.css('app-properties'));

        expect(propComp).toBeTruthy();
      });

      it('should not exist if the item properties is not present', () => {
        let propComp = fixture.debugElement.query(By.css('app-properties'));

        expect(propComp).toBeFalsy();
      });

      it('should use the item.item as input', () => {
        item.item['properties'] = ['MockValue'];
        fixture.detectChanges();
        let propComp = fixture.debugElement.query(By.css('app-properties')).componentInstance as PropertiesStub;

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
        let reqComp = fixture.debugElement.query(By.css('app-itemrequirements'));

        expect(reqComp).toBeTruthy();
      });

      it('should exist if the item.item.requirements exists', () => {
        item.item['requirements'] = ['MockValue'];
        fixture.detectChanges();
        let reqComp = fixture.debugElement.query(By.css('app-itemrequirements'));

        expect(reqComp).toBeTruthy();
      });

      it('should exist if the item.item.talismanTier exists', () => {
        item.item['talismanTier'] = 1;
        fixture.detectChanges();
        let reqComp = fixture.debugElement.query(By.css('app-itemrequirements'));

        expect(reqComp).toBeTruthy();
      });

      it('should not exist if the item.item.talismanTier, item.item.ilvl, and item.item.requirements is not present', () => {
        let reqComp = fixture.debugElement.query(By.css('app-itemrequirements'));

        expect(reqComp).toBeFalsy();
      });

      it('should use the item.item as input', () => {
        item.item['talismanTier'] = 1;
        fixture.detectChanges();
        let reqComp = fixture.debugElement.query(By.css('app-itemrequirements')).componentInstance as ItemRequirementsStub;

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
        let modlistComp = fixture.debugElement.query(By.css('app-modlist'));

        expect(modlistComp).toBeTruthy();
      });

      it('should not exist if the item.item.enchantMods is empty/null', () => {
        let modlistComp = fixture.debugElement.query(By.css('app-modlist'));

        expect(modlistComp).toBeFalsy();
      });

      it('should use the item.item as the item input', () => {
        item.item['enchantMods'] = ['MockValue'];
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('app-modlist')).componentInstance as ModListStub;

        expect(modlistComp.item).toEqual(component.item.item);
      });

      it('should use the enchantModProperties as the modProperties input', () => {
        item.item['enchantMods'] = ['MockValue'];
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('app-modlist')).componentInstance as ModListStub;

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
        let modlistComp = fixture.debugElement.query(By.css('app-modlist'));

        expect(modlistComp).toBeTruthy();
      });

      it('should not exist if the item.item.implicitMods is empty/null', () => {
        let modlistComp = fixture.debugElement.query(By.css('app-modlist'));

        expect(modlistComp).toBeFalsy();
      });

      it('should use the item.item as the item input', () => {
        item.item['implicitMods'] = ['MockValue'];
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('app-modlist')).componentInstance as ModListStub;

        expect(modlistComp.item).toEqual(component.item.item);
      });

      it('should use the implicitModProperties as the modProperties input', () => {
        item.item['implicitMods'] = ['MockValue'];
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('app-modlist')).componentInstance as ModListStub;

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
        fixture.detectChanges();
      });

      it('should exist if the item.item.explicitMods has values and the item.item.frameType is not 6', () => {
        item.item['explicitMods'] = ['MockValue'];
        item.item['frameType'] = 0;
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('app-modlist'));

        expect(modlistComp).toBeTruthy();
      });

      it('should exist if the item.item.fracturedMods has values and the item.item.frameType is not 6', () => {
        item.item['fracturedMods'] = ['MockValue'];
        item.item['frameType'] = 0;
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('app-modlist'));

        expect(modlistComp).toBeTruthy();
      });

      it('should exist if the item.item.craftedMods has values and the item.item.frameType is not 6', () => {
        item.item['craftedMods'] = ['MockValue'];
        item.item['frameType'] = 0;
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('app-modlist'));

        expect(modlistComp).toBeTruthy();
      });

      it('should exist if the item.item.corrupted is not null and the item.item.frameType is not 6', () => {
        item.item['corrupted'] = true;
        item.item['frameType'] = 0;
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('app-modlist'));

        expect(modlistComp).toBeTruthy();
      });

      it('should exist if the item.item.duplicated is not null and the item.item.frameType is not 6', () => {
        item.item['duplicated'] = true;
        item.item['frameType'] = 0;
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('app-modlist'));

        expect(modlistComp).toBeTruthy();
      });

      it('should not exist if the item.item.implicitMods, item.item.fracturedMods, item.item.craftedMods, item.item.corrupted, and item.item.duplicated is empty/null', () => {
        let modlistComp = fixture.debugElement.query(By.css('app-modlist'));

        expect(modlistComp).toBeFalsy();
      });

      it('should not exist if the item.item.frameType equals 6', () => {
        item.item['explicitMods'] = ['MockValue'];
        item.item['fracturedMods'] = ['MockValue'];
        item.item['craftedMods'] = ['MockValue'];
        item.item['corrupted'] = ['MockValue'];
        item.item['duplicated'] = ['MockValue'];
        fixture.detectChanges()
        let modlistComp = fixture.debugElement.query(By.css('app-modlist'));

        expect(modlistComp).toBeFalsy();
      });

      it('should use the item.item as the item input', () => {
        item.item['explicitMods'] = ['MockValue'];
        item.item['frameType'] = 0;
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('app-modlist')).componentInstance as ModListStub;

        expect(modlistComp.item).toEqual(component.item.item);
      });

      it('should use the implicitModProperties as the modProperties input', () => {
        item.item['explicitMods'] = ['MockValue'];
        item.item['frameType'] = 0;
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('app-modlist')).componentInstance as ModListStub;

        expect(modlistComp.modProperties).toEqual(component.explicitModProperties);
      });

      it('should have a p element with text content \'Corrupted\' if the item.item.corrupted is true', () => {
        item.item['corrupted'] = true;
        item.item['frameType'] = 0;
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('app-modlist'));
        let corruptedP = modlistComp.query(By.css('p'));

        expect(corruptedP.nativeElement.textContent).toEqual('Corrupted');
      });

      it('should have a p element with text content \'Mirrored\' if the item.item.duplicated is true', () => {
        item.item['duplicated'] = true;
        item.item['frameType'] = 0;
        fixture.detectChanges();
        let modlistComp = fixture.debugElement.query(By.css('app-modlist'));
        let corruptedP = modlistComp.query(By.css('p'));

        expect(corruptedP.nativeElement.textContent).toEqual('Mirrored');
      });
    });

    describe('Div Mods Component', () => {

      afterEach(() => {
        item.item['frameType'] = null;
        item.item['explicitMods'] = null;
        fixture.detectChanges();
      });

      it('should not exist if the item.item.frameType is not 6', () => {
        item.item['explicitMods'] = ['MockValue'];
        fixture.detectChanges();
        let divModsComp = fixture.debugElement.query(By.css('app-divmods'));

        expect(divModsComp).toBeFalsy();
      });

      it('should not exist ifthe item.item.explicitMods is empty/null', () => {
        item.item['frameType'] = 6;
        fixture.detectChanges();
        let divModsComp = fixture.debugElement.query(By.css('app-divmods'));

        expect(divModsComp).toBeFalsy();
      });

      it('should use item.item as the item input', () => {
        item.item['frameType'] = 6;
        item.item['explicitMods'] = ['MockValue'];
        fixture.detectChanges();
        let divModsComp = fixture.debugElement.query(By.css('app-divmods')).componentInstance as DivModsStub;

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
        let addPropsComp = fixture.debugElement.query(By.css('app-additionalproperties'));

        expect(addPropsComp).toBeFalsy();
      });

      it('should use item.item as the item input', () => {
        item.item['additionalProperties'] = ['Mock Value'];
        fixture.detectChanges();
        let addPropsComp = fixture.debugElement.query(By.css('app-additionalproperties')).componentInstance as AdditionalPropertiesStub;

        expect(addPropsComp.additionalProperties).toEqual(component.item.item['additionalProperties']);
      });
    });

    describe('Incubator Component', () => {
      afterEach(() => {
        item.item['incubatedItem'] = null;
        fixture.detectChanges();
      });

      it('should not exist if the item.item.incubatedItem is null', () => {
        let incComp = fixture.debugElement.query(By.css('app-incubator'));

        expect(incComp).toBeFalsy();
      });

      it('should use item.item as the item input', () => {
        item.item['incubatedItem'] = 'Mockvalue';
        fixture.detectChanges();
        let incComp = fixture.debugElement.query(By.css('app-incubator')).componentInstance as IncubatorStub;

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
        let totalValComp = fixture.debugElement.query(By.css('app-totalvalues'));

        expect(totalValComp).toBeFalsy();
      });

      it('should exist if the item.item.extended.dps exists', () => {
        item.item.extended['dps'] = 1;
        fixture.detectChanges();
        let totalValComp = fixture.debugElement.query(By.css('app-totalvalues'));

        expect(totalValComp).toBeTruthy();
      });

      it('should exist if the item.item.extended.pdps exists', () => {
        item.item.extended['pdps'] = 1;
        fixture.detectChanges();
        let totalValComp = fixture.debugElement.query(By.css('app-totalvalues'));

        expect(totalValComp).toBeTruthy();
      });

      it('should exist if the item.item.extended.edps exists', () => {
        item.item.extended['edps'] = 1;
        fixture.detectChanges();
        let totalValComp = fixture.debugElement.query(By.css('app-totalvalues'));

        expect(totalValComp).toBeTruthy();
      });

      it('should exist if the item.item.extended.ar exists', () => {
        item.item.extended['ar'] = 1;
        fixture.detectChanges();
        let totalValComp = fixture.debugElement.query(By.css('app-totalvalues'));

        expect(totalValComp).toBeTruthy();
      });

      it('should exist if the item.item.extended.ev exists', () => {
        item.item.extended['ev'] = 1;
        fixture.detectChanges();
        let totalValComp = fixture.debugElement.query(By.css('app-totalvalues'));

        expect(totalValComp).toBeTruthy();
      });

      it('should exist if the item.item.extended.es exists', () => {
        item.item.extended['es'] = 1;
        fixture.detectChanges();
        let totalValComp = fixture.debugElement.query(By.css('app-totalvalues'));

        expect(totalValComp).toBeTruthy();
      });

      it('should use item.item as the item input', () => {
        item.item.extended['es'] = 1;
        fixture.detectChanges();
        let totalValComp = fixture.debugElement.query(By.css('app-totalvalues')).componentInstance as TotalValuesStub;

        expect(totalValComp.extended).toEqual(component.item.item['extended']);
      });
    });

    describe('Listing Info Component', () => {

      it('should use item.listing as the listing input', () => {
        let listingComp = fixture.debugElement.query(By.css('app-listinginfo')).componentInstance as ListingInfoStub;

        expect(listingComp.listing).toEqual(component.item.listing);
      });
    });
  });
});
