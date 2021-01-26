import { Component, Input, OnInit } from '@angular/core';
import { MapForm } from 'src/app/classes/formgroups/map-form';
import { trueFlase } from '../../../enums/TrueFalseEnum';

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

  @Input() mapForm: MapForm;                                             //Main item form

  constructor() {
  }

  ngOnInit(): void {
    this.mapForm.controls.disabled.valueChanges.subscribe(disabled => {    //When disbaled changes to false, and the form is still disabled then enable it
      if (!disabled && this.mapForm.disabled) this.mapForm.enable({emitEvent: false});
    });
  }

  ngAfterContentChecked() {   //Disable the form when the disable value is true and the form is enabled
    if (this.mapForm.controls.disabled.value && this.mapForm.enabled) {
      this.mapForm.disable();
    }
  }

  /**
   * Resets to default values for inputs
   */
  public reset() {
    this.mapForm.reset();
  }

}
