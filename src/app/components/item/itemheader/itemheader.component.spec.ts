import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ItemheaderComponent } from './itemheader.component';

describe('ItemheaderComponent', () => {
  let component: ItemheaderComponent;
  let fixture: ComponentFixture<ItemheaderComponent>;
  let mockItem = {
    frameType: 3,
    name: null,
    typeLine: null,
    influences: null,
    fractured: null,
    synthesised: null
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemheaderComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemheaderComponent);
    component = fixture.componentInstance;
    component.item = mockItem;
    fixture.detectChanges();
  });

  describe('Component HTML', () => {

    describe('item header container', () => {

      it('should have a class with the item frameType prefixed with \'rarity-\'', () => {
        let container = fixture.debugElement.query(By.css('.item-header'));
        expect(container.classes).toEqual(jasmine.objectContaining({ 'rarity-3': true }));
      });
    });


    describe('item influence icons', () => {

      afterEach(() => {
        mockItem.influences = null;
        fixture.detectChanges();
      });

      it('has shaper influence icon if the shaper influence value is true', () => {
        mockItem.influences = {
          shaper: true
        };
        fixture.detectChanges();

        let iconContainer = fixture.debugElement.query(By.css('.influence-icon-container'));
        expect(iconContainer.query(By.css('img')).attributes.src).toEqual('https://web.poecdn.com/image/item/popup/shaper-symbol.png?1605141671963');
      });
      it('has elder influence icon if the elder influence value is true', () => {
        mockItem.influences = {
          elder: true
        };
        fixture.detectChanges();

        let iconContainer = fixture.debugElement.query(By.css('.influence-icon-container'));
        expect(iconContainer.query(By.css('img')).attributes.src).toEqual('https://web.poecdn.com/image/item/popup/elder-symbol.png?1605141671959');

      });
      it('has crusader influence icon if the crusader influence value is true', () => {
        mockItem.influences = {
          crusader: true
        };
        fixture.detectChanges();

        let iconContainer = fixture.debugElement.query(By.css('.influence-icon-container'));
        expect(iconContainer.query(By.css('img')).attributes.src).toEqual('https://web.poecdn.com/image/item/popup/crusader-symbol.png?1605141671959');

      });
      it('has redeemer influence icon if the redeemer influence value is true', () => {
        mockItem.influences = {
          redeemer: true
        };
        fixture.detectChanges();

        let iconContainer = fixture.debugElement.query(By.css('.influence-icon-container'));
        expect(iconContainer.query(By.css('img')).attributes.src).toEqual('https://web.poecdn.com/image/item/popup/redeemer-symbol.png?1605141671963');

      });
      it('has hunter influence icon if the hunter influence value is true', () => {
        mockItem.influences = {
          hunter: true
        };
        fixture.detectChanges();

        let iconContainer = fixture.debugElement.query(By.css('.influence-icon-container'));
        expect(iconContainer.query(By.css('img')).attributes.src).toEqual('https://web.poecdn.com/image/item/popup/hunter-symbol.png?1605141671963');
      });
      it('has warlord influence icon if the warlord influence value is true', () => {
        mockItem.influences = {
          warlord: true
        };
        fixture.detectChanges();

        let iconContainer = fixture.debugElement.query(By.css('.influence-icon-container'));
        expect(iconContainer.query(By.css('img')).attributes.src).toEqual('https://web.poecdn.com/image/item/popup/warlord-symbol.png?1605141671963');
      });

      it('shares the same icon twice in the same container if its the only influence present', () => {
        mockItem.influences = {
          warlord: true
        };
        fixture.detectChanges();

        let iconContainer = fixture.debugElement.query(By.css('.influence-icon-container'));
        expect(iconContainer.queryAll(By.css('img'))[0].attributes.src).toEqual('https://web.poecdn.com/image/item/popup/warlord-symbol.png?1605141671963');
        expect(iconContainer.queryAll(By.css('img'))[1].attributes.src).toEqual('https://web.poecdn.com/image/item/popup/warlord-symbol.png?1605141671963');
      });

      it('has influence-icon-left class on the icon image if its the first icon', () => {
        mockItem.influences = {
          warlord: true,
          redeemer: true
        };
        fixture.detectChanges();

        let iconContainer = fixture.debugElement.queryAll(By.css('.influence-icon-container'));
        expect(iconContainer[0].query(By.css('.influence-icon-left'))).toBeTruthy();
      });

      it('has influence-icon-right class on the icon container if its the last icon', () => {
        mockItem.influences = {
          warlord: true,
          redeemer: true
        };
        fixture.detectChanges();

        let iconContainer = fixture.debugElement.queryAll(By.css('.influence-icon-container'));
        expect(iconContainer[1].query(By.css('.influence-icon-right'))).toBeTruthy();
      })
    });

    describe('Fracture Icon Container', () => {

      afterEach(() => {
        mockItem.fractured = null;
        fixture.detectChanges();
      });

      it('should not exist if fractured is null/false on the item', () => {
        expect(fixture.debugElement.query(By.css('.influence-icon-container'))).toBeFalsy();
      });

      it('should contain two images in the container', () => {
        mockItem.fractured = true;
        fixture.detectChanges();
        let cont = fixture.debugElement.query(By.css('.influence-icon-container'));

        expect(cont.queryAll(By.css('img')).length).toEqual(2);
      });
    }); 

    describe('Synthesised Icon Container', () => {

      afterEach(() => {
        mockItem.synthesised = null;
        fixture.detectChanges();
      });

      it('should not exist if synthesised is null/false on the item', () => {
        expect(fixture.debugElement.query(By.css('.influence-icon-container'))).toBeFalsy();
      });

      it('should contain two images in the container', () => {
        mockItem.synthesised = true;
        fixture.detectChanges();
        let cont = fixture.debugElement.query(By.css('.influence-icon-container'));

        expect(cont.queryAll(By.css('img')).length).toEqual(2);
      });
    }); 

    describe('Item Name Header', () => {
      
      afterEach(() => {
        mockItem.name = null;
        fixture.detectChanges();
      });

      it('should not exist if the item name is null', () => {
        expect(fixture.debugElement.query(By.css('.item-name'))).toBeFalsy();
      });

      it('should have its text content equal to the item name', () => {
        mockItem.name = "Mock Name";
        fixture.detectChanges();
        let nameHeader = fixture.debugElement.query(By.css('.item-name'));

        expect(nameHeader.nativeElement.textContent).toEqual("Mock Name");
      });
    });

    describe('Item Type Header', () => {
      
      afterEach(() => {
        mockItem.typeLine = null;
        fixture.detectChanges();
      });

      it('should not exist if the item typeLine is null', () => {
        expect(fixture.debugElement.query(By.css('.item-type'))).toBeFalsy();
      });

      it('should have its text content equal to the item typeLine', () => {
        mockItem.typeLine = "Mock Type";
        fixture.detectChanges();
        let nameHeader = fixture.debugElement.query(By.css('.item-type'));

        expect(nameHeader.nativeElement.textContent).toEqual("Mock Type");
      });
    });
  });
});
