import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { parsedDivData } from 'src/app/models/parsedDivData';

import { DivmodsComponent } from './divmods.component';

@Pipe({
  name: 'parseDivs',
  pure: true
})
class ParseDivsPipePipeStub implements PipeTransform {

  transform(mods: any): Array<parsedDivData> { return null }
}

describe('DivmodsComponent', () => {
  let component: DivmodsComponent;
  let fixture: ComponentFixture<DivmodsComponent>;
  const mockMods = ["1", "2"];          //Value is arbitrary

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivmodsComponent, ParseDivsPipePipeStub ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivmodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component HTML', () => {

    beforeEach(() => {
      spyOn(ParseDivsPipePipeStub.prototype, 'transform').and.returnValue([
        {
          values: [{
            text: 'Daresso\'s Salute',
            display: 'uniqueitem'
          }]
        },
        {
          values: [
            {
              text: "Item Level:",
              display: "default"
            },
            {
              text: ' 66',
              display: "normal"
            }
          ]
        }
      ]);
      component.explicitMods = mockMods;
      fixture.detectChanges();
    });

    describe('Mod Values Spans', () => {
      
      it('should display the correct values', () => {
        let valueSpans = fixture.debugElement.queryAll(By.css('span'));

        expect(valueSpans[0].nativeElement.textContent).toContain('Daresso\'s Salute');
        expect(valueSpans[1].nativeElement.textContent).toContain('Item Level:');
        expect(valueSpans[2].nativeElement.textContent).toContain(' 66');
      });

      it('should have the value display property as a class', () => {
        let valueSpans = fixture.debugElement.queryAll(By.css('span'));

        expect(valueSpans[0].classes).toEqual(jasmine.objectContaining({'uniqueitem': true}));
        expect(valueSpans[1].classes).toEqual(jasmine.objectContaining({'default': true}));
        expect(valueSpans[2].classes).toEqual(jasmine.objectContaining({'normal': true}));
      });
    });
  });
});
