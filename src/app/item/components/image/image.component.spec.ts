import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ImageComponent } from './image.component';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;
  let mockItem = {
    icon: "mock_url",
    sockets: null,
    w: null
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    component.item = mockItem;
    fixture.detectChanges();
  });

  describe('Component HTML', () => {

    describe("Item Image", () => {
      let image: DebugElement;

      beforeEach(() => {
        image = fixture.debugElement.query(By.css('img'));
      });

      afterEach(() => {
        mockItem['name'] = null;
        mockItem['typeLine'] = null;
      });

      it('has a source eqaul to the item icon', () => {
        expect(image.attributes.src).toEqual("mock_url");
      });

      it("has a proper aria-label", () => {
        mockItem['name'] = null;
        mockItem['typeLine'] = "Mock Type";
        fixture.detectChanges();

        expect(image.attributes['aria-label']).toEqual('Image of Mock Type');

        mockItem['name'] = "Mock Name";
        mockItem['typeLine'] = "Mock Type";
        fixture.detectChanges();

        expect(image.attributes['aria-label']).toEqual('Image of Mock Name Mock Type');
      });
    });

    describe('Sockets Container Element', () => {

      afterEach(() => {
        mockItem.sockets = null;
      });

      it('should not exist if the item sockets is null', () => {
        expect(fixture.debugElement.query(By.css('.sockets'))).toBeFalsy();
      });

      it('has a width of 92px if the item.w == 2 and the item.sockets.length > 1', () => {
        mockItem.sockets = [
          {group: 0, sColour: "mock"},
          {group: 0, sColour: "mock"}
        ];
        mockItem.w = 2;
        fixture.detectChanges();
        let sockets = fixture.debugElement.query(By.css('.sockets'));

        expect(sockets.styles.width).toEqual('92px');
      });

      it('has a width of 46px if the item.w == 2 and the item.sockets.length == 1', () => {
        mockItem.sockets = [
          {group: 0, sColour: "mock"}
        ];
        mockItem.w = 2;
        fixture.detectChanges();
        let sockets = fixture.debugElement.query(By.css('.sockets'));

        expect(sockets.styles.width).toEqual('46px');
      });

      it('has a width of 46px if the item.w == 1', () => {
        mockItem.sockets = [
          {group: 0, sColour: "mock"}
        ];
        mockItem.w = 1;
        fixture.detectChanges();
        let sockets = fixture.debugElement.query(By.css('.sockets'));

        expect(sockets.styles.width).toEqual('46px');
      });
    });

    describe('Socket with Item width 2', () => {
      let sockets: Array<DebugElement>; 

      beforeEach(() => {
        mockItem.w = 2;
        mockItem.sockets = [
          {group: 0, sColour: "1"},
          {group: 0, sColour: "2"},
          {group: 1, sColour: "3"},
          {group: 2, sColour: "4"},
          {group: 2, sColour: "5"},
          {group: 2, sColour: "6"}
        ];
        fixture.detectChanges();
        sockets = fixture.debugElement.queryAll(By.css('.socket'));
      });

      afterEach(() => {
        mockItem.w = null;
        mockItem.sockets = null;
        fixture.detectChanges();
      })

      it("should have a class equal to the socket sColor property", () => {
        expect(sockets[0].classes).toEqual(jasmine.objectContaining({'1': true}));
        expect(sockets[1].classes).toEqual(jasmine.objectContaining({'2': true}));
        expect(sockets[2].classes).toEqual(jasmine.objectContaining({'3': true}));
        expect(sockets[3].classes).toEqual(jasmine.objectContaining({'4': true}));
        expect(sockets[4].classes).toEqual(jasmine.objectContaining({'5': true}));
        expect(sockets[5].classes).toEqual(jasmine.objectContaining({'6': true}));
      });

      it("should have its z-index equal to number of sockets - its index", () => {
        expect(sockets[0].styles['z-index']).toEqual('6');
        expect(sockets[1].styles['z-index']).toEqual('5');
        expect(sockets[2].styles['z-index']).toEqual('4');
        expect(sockets[3].styles['z-index']).toEqual('3');
        expect(sockets[4].styles['z-index']).toEqual('2');
        expect(sockets[5].styles['z-index']).toEqual('1');
      });

      it("should have class right if its index is 1, 2, or 5", () => {
        expect(sockets[0].classes).not.toEqual(jasmine.objectContaining({'right': true}));
        expect(sockets[1].classes).toEqual(jasmine.objectContaining({'right': true}));
        expect(sockets[2].classes).toEqual(jasmine.objectContaining({'right': true}));
        expect(sockets[3].classes).not.toEqual(jasmine.objectContaining({'right': true}));
        expect(sockets[4].classes).not.toEqual(jasmine.objectContaining({'right': true}));
        expect(sockets[5].classes).toEqual(jasmine.objectContaining({'right': true}));
      });

      it("should have socket-connection-horiz span if the index of the socket is even, and the next socket shares the same group value", () => {
        expect(sockets[0].query(By.css('.socket-connection-horiz'))).toBeTruthy();
        expect(sockets[1].query(By.css('.socket-connection-horiz'))).toBeFalsy();
        expect(sockets[2].query(By.css('.socket-connection-horiz'))).toBeFalsy();
        expect(sockets[3].query(By.css('.socket-connection-horiz'))).toBeFalsy();
        expect(sockets[4].query(By.css('.socket-connection-horiz'))).toBeTruthy();
        expect(sockets[5].query(By.css('.socket-connection-horiz'))).toBeFalsy();
      });

      it("the socket-connection-horiz span should contain to-right class if the index is 2 otherwise it should contain the to-left class", () => {
        mockItem.sockets[2].group = 2;
        fixture.detectChanges();
        expect(sockets[0].query(By.css('.socket-connection-horiz')).classes).toEqual(jasmine.objectContaining({'to-left': true}));
        expect(sockets[2].query(By.css('.socket-connection-horiz')).classes).toEqual(jasmine.objectContaining({'to-right': true}));
        expect(sockets[4].query(By.css('.socket-connection-horiz')).classes).toEqual(jasmine.objectContaining({'to-left': true}));
      });

      it("should have socket-connection-vert span if the index of the socket is odd, and the next socket shares the same group value", () => {
        expect(sockets[0].query(By.css('.socket-connection-vert'))).toBeFalsy();
        expect(sockets[1].query(By.css('.socket-connection-vert'))).toBeFalsy();
        expect(sockets[2].query(By.css('.socket-connection-vert'))).toBeFalsy();
        expect(sockets[3].query(By.css('.socket-connection-vert'))).toBeTruthy();
        expect(sockets[4].query(By.css('.socket-connection-vert'))).toBeFalsy();
        expect(sockets[5].query(By.css('.socket-connection-vert'))).toBeFalsy();
      });
    });

    describe('Socket with Item width 1', () => {
      let sockets: Array<DebugElement>; 

      beforeEach(() => {
        mockItem.w = 1;
        mockItem.sockets = [
          {group: 0, sColour: "1"},
          {group: 0, sColour: "2"},
          {group: 1, sColour: "3"},
          {group: 2, sColour: "4"},
        ];
        fixture.detectChanges();
        sockets = fixture.debugElement.queryAll(By.css('.socket'));
      });

      afterEach(() => {
        mockItem.w = null;
        mockItem.sockets = null;
        fixture.detectChanges();
      })

      it("should have a class equal to the socket sColor property", () => {
        expect(sockets[0].classes).toEqual(jasmine.objectContaining({'1': true}));
        expect(sockets[1].classes).toEqual(jasmine.objectContaining({'2': true}));
        expect(sockets[2].classes).toEqual(jasmine.objectContaining({'3': true}));
        expect(sockets[3].classes).toEqual(jasmine.objectContaining({'4': true}));
      });

      it("should have its z-index equal to number of sockets - its index", () => {
        expect(sockets[0].styles['z-index']).toEqual('4');
        expect(sockets[1].styles['z-index']).toEqual('3');
        expect(sockets[2].styles['z-index']).toEqual('2');
        expect(sockets[3].styles['z-index']).toEqual('1');
      });

      it("should not have class right", () => {
        expect(sockets[0].classes).not.toEqual(jasmine.objectContaining({'right': true}));
        expect(sockets[1].classes).not.toEqual(jasmine.objectContaining({'right': true}));
        expect(sockets[2].classes).not.toEqual(jasmine.objectContaining({'right': true}));
        expect(sockets[3].classes).not.toEqual(jasmine.objectContaining({'right': true}));
      });

      it("should not have socket-connection-horiz span", () => {
        expect(sockets[0].query(By.css('.socket-connection-horiz'))).toBeFalsy();
        expect(sockets[1].query(By.css('.socket-connection-horiz'))).toBeFalsy();
        expect(sockets[2].query(By.css('.socket-connection-horiz'))).toBeFalsy();
        expect(sockets[3].query(By.css('.socket-connection-horiz'))).toBeFalsy();
      });


      it("should have socket-connection-vert span if the next socket shares the same group value", () => {
        expect(sockets[0].query(By.css('.socket-connection-vert'))).toBeTruthy();
        expect(sockets[1].query(By.css('.socket-connection-vert'))).toBeFalsy();
        expect(sockets[2].query(By.css('.socket-connection-vert'))).toBeFalsy();
        expect(sockets[3].query(By.css('.socket-connection-vert'))).toBeFalsy();
      });
    });
  });
});
