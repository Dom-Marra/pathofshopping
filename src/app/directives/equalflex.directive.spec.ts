import { Component, DebugElement, ElementRef, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EqualflexDirective } from './equalflex.directive';

@Component({
  selector: 'test-container',
  template: `<div appEqualflex style='display: flex; flex-wrap: wrap'>
                <div class="equal-flex">equal flex</div>
                <div class="equal-flex other-class">equal flex</div>
                <div class="equal-flex">equal flex</div>
             </div>`,
})
class TestContainerComponent {
}

describe('EqualflexDirective', () => {
  let fixture: ComponentFixture<TestContainerComponent>;
  let container: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ EqualflexDirective, TestContainerComponent ]
    }).createComponent(TestContainerComponent);

    fixture.detectChanges();
    container = fixture.debugElement.children[0];
  });

  it('should have added 3 placeholders', () => {
    expect(container.children.length).toBe(6);
  });

  it('should have added the same classes of the children to the placeholders', () => {
    for (let pIndex = 3; pIndex < container.children.length; pIndex++) {
      expect((container.children[pIndex].nativeElement as HTMLElement).classList.value).toEqual('equal-flex other-class');
    }
  });

  it('should have set proper styles on the placeholders', () => {
    for (let pIndex = 3; pIndex < container.children.length; pIndex++) {
      let child = (container.children[pIndex].nativeElement as HTMLElement);
      expect(child.style.paddingTop).toBe('0px');
      expect(child.style.paddingBottom).toBe('0px');
      expect(child.style.marginTop).toBe('0px');
      expect(child.style.marginBottom).toBe('0px');
      expect(child.style.height).toBe('0px');
      expect(child.style.visibility).toBe('hidden');
    }
  });
});
