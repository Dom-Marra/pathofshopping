import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { trueFlase } from './../trueFalseEnum';

enum mapSeries {
  '' = 'All',
  current = 'Current',
  harvest = 'Harvest',
  delirium = 'Delirium',
  metamorph = 'Metamorph',
  blight = 'Blight',
  legion = 'Legion',
  synthesis = 'Synthesis',
  betrayal = 'Betrayal',
  worfortheatlas = 'War for The Atlas',
  atlasofworlds = 'Atlas of Worlds',
  theawakening = 'The Awakening',
  legacy = 'Legacy'
}

enum mapRegion {
  '' = 'All',
  otl = "Haewark Hamlet",
  itl = "Tirn's End",
  itr = "Lex Proxima",
  otr = "Lex Ejoris",
  obl = "New Vastir",
  ibl = "Glennach Cairn",
  ibr = "Valdo's Rest",
  obr = "Lira Arthain"
}

@Component({
  selector: 'app-mapfilters',
  templateUrl: './mapfilters.component.html',
  styleUrls: ['./mapfilters.component.scss']
})
export class MapfiltersComponent implements OnInit {

  public readonly MAP_REGION: typeof mapRegion = mapRegion;               //Used for map region selection
  public readonly MAP_SERIES: typeof mapSeries = mapSeries;               //used for map series selection
  public readonly TRUE_FALSE: typeof trueFlase = trueFlase;               //used for true false selection

  @Input() itemForm: FormGroup;                                           //Main item form

  public mapFilters: FormGroup = new FormGroup({
    disabled: new FormControl({value: false, disabled: true}),
    filters: new FormGroup({
      map_region: new FormGroup(
        {option: new FormControl('')}
      ),
      map_series: new FormGroup(
        {option: new FormControl('')}
      ),
      map_shaped: new FormGroup(
        {option: new FormControl('')}
      ),
      map_elder: new FormGroup(
        {option: new FormControl('')}
      ),
      map_blighted: new FormGroup(
        {option: new FormControl('')}
      ),
      map_tier: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      map_packsize: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      map_iiq: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      map_iir: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      })
    })
  })

  constructor() {
  }

  ngOnInit(): void {
    if (this.itemForm.controls['map_filters']) {                              //Retain item map data if it exists
      this.mapFilters = this.itemForm.controls['map_filters'] as FormGroup;
    } else {
      this.itemForm.addControl('map_filters', this.mapFilters);               //Add field for map data
    }

    this.mapFilters.controls.disabled.valueChanges.subscribe(disabled => {    //When disbaled changes to false, and the form is still disabled then enable it
      if (!disabled && this.mapFilters.disabled) this.mapFilters.enable({emitEvent: false});
    });
  }

  ngAfterContentChecked() {   //Disable the form when the disable value is true and the form is enabled
    if (this.mapFilters.controls.disabled.value && this.mapFilters.enabled) {
      this.mapFilters.disable();
    }
  }

  /**
   * Resets to default values for inputs
   */
  public reset() {
    this.mapFilters.reset();
  }

}
