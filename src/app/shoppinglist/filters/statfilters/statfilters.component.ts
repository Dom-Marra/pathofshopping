import { ChangeDetectorRef, Component, ComponentFactoryResolver, Input, OnInit, Renderer2, ViewChild, ViewContainerRef, ViewEncapsulation, ViewRef } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { statCategory } from 'src/app/statsearch.service';
import { StatselectComponent } from '../../statselect/statselect.component';

enum filterTypes {
  and = 'And',
  if = 'If',
  not = 'Not',
  count = 'Count',
  weight = 'Weighted Sum'
}

@Component({
  selector: 'app-statfilters',
  templateUrl: './statfilters.component.html',
  styleUrls: ['./statfilters.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StatfiltersComponent implements OnInit {

  public readonly FILTER_TYPES: typeof filterTypes = filterTypes;                               //Used to cycle over filter types

  @ViewChild('statContainerRef', {read: ViewContainerRef}) statContainerRef: ViewContainerRef;  //stat contianer template ref
  @Input() itemForm: FormArray;                                                                 //Main item form
  @Input() viewRef: ViewRef;

  public statFilters = new FormGroup({
    type: new FormControl('and'),
    filters: new FormArray([]),
    value: new FormGroup({
      min: new FormControl(),
      max: new FormControl()
    })
  })

  constructor(private cd: ChangeDetectorRef, private compResolver: ComponentFactoryResolver, private renderer2: Renderer2) {
  }

  ngOnInit(): void { 
    this.itemForm.push(this.statFilters);
  }

  ngAfterViewInit(): void {
    this.addStatSelect();
    this.cd.detectChanges();
  }

    /**
   * Adds a new Item Component
   * 
   * @param statData 
   *        Item: data to bind when creating the item
   */
  public addStatSelect(statData?: statCategory) {
    const newStatComp = this.compResolver.resolveComponentFactory(StatselectComponent);
    
    const componentRef = this.statContainerRef.createComponent(newStatComp);
    
    componentRef.instance.viewRef = componentRef.hostView;
    componentRef.instance.array = this.statFilters.get('filters') as FormArray;
    componentRef.instance.newGroupCreated.subscribe(() => {
      this.addStatSelect();
    });

    this.statFilters.controls.type.valueChanges.subscribe(value => {
      componentRef.instance.isWeight = (value == 'weight');
      componentRef.instance.addWeightFilter();
    })

    this.renderer2.addClass(componentRef.location.nativeElement, 'stat-field');
  }

  /**
   * Deletes this stat filter group
   */
  public destroy() {
    let index = this.itemForm.controls.indexOf(this.statFilters);
    this.itemForm.removeAt(index);
    this.viewRef.destroy();
  }
}
