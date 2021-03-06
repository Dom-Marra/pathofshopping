import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { modProperties } from 'src/app/models/modProperties';

import { ModlistComponent } from './modlist.component';

@Component({selector: 'app-mod'})
class ModStub {
  @Input() mod: any;
}

@Pipe({
  name: 'parseMods',
  pure: true
})
export class ParseModsPipePipeStub implements PipeTransform {

  transform(item: any, modPropString: string, extendedPropName: string) : any {
    return ["Mod 1", "Mod 2"];
  }
}

describe('ModlistComponent', () => {
  let component: ModlistComponent;
  let fixture: ComponentFixture<ModlistComponent>;
  const mockItem = { };

  const mockModProps: Array<modProperties> = [{
    modPropString: 'mockMods',
    extendedPropName: 'mock',
    specialClass: 'mock-class'
  }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModlistComponent, ModStub, ParseModsPipePipeStub ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModlistComponent);
    component = fixture.componentInstance;
    component.modProperties = mockModProps;
    component.item = mockItem;
    fixture.detectChanges();
  });

  describe('Component HTML', () => {

    describe('Mod Component', () => {

      it('has the correct number of mod components', () => {
        //We have one set of mod properties and the stub pipe will return 2 mods always
        expect(fixture.debugElement.queryAll(By.css('app-mod')).length).toEqual(2);
      });

      it('should set the mod input correctly', () => {
        let modComps = fixture.debugElement.queryAll(By.css('app-mod'));

        expect((modComps[0].componentInstance as ModStub).mod).toEqual("Mod 1");
        expect((modComps[1].componentInstance as ModStub).mod).toEqual("Mod 2");
      });

      it('should add the special class as a class if it exists', () => {
        let modComps = fixture.debugElement.queryAll(By.css('.mock-class'));

        expect(modComps.length).toEqual(2);
      });

      it('should use the correct params in the parseMod pipe', () => {
        spyOn(ParseModsPipePipeStub.prototype, 'transform');
        component.modProperties = [{
          modPropString: 'mockMods',
          extendedPropName: 'mock',
          specialClass: 'mock-class'
        }];
        fixture.detectChanges();
        expect(ParseModsPipePipeStub.prototype.transform).toHaveBeenCalledWith(component.item, 'mockMods', 'mock');
      })
    });
  });
});
