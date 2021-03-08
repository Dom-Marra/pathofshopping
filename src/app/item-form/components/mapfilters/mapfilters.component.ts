import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { simpleData } from 'src/app/core/models/simpleData';
import { SimpleDataService } from 'src/app/core/services/simpledata.service';

@Component({
  selector: 'itemForm-mapfilters',
  templateUrl: './mapfilters.component.html',
  styleUrls: ['./mapfilters.component.scss']
})
export class MapfiltersComponent implements OnInit {

  public readonly mapRegions: Array<simpleData> = [     //Used for map region selection
    {id: '', text: 'All'},
    {id: 'otl', text: "Haewark Hamlet"},
    {id: 'itl', text: "Tirn's End"},
    {id: 'itr', text: "Lex Proxima"},
    {id: 'otr', text: "Lex Ejoris"},
    {id: 'obl', text: "New Vastir"},
    {id: 'ibl', text: "Glennach Cairn"},
    {id: 'ibr', text: "Valdo's Rest"},
    {id: 'obr', text: "Lira Arthain"}
  ];               
  public readonly mapSeries: Array<simpleData> = [     //used for map series selection
    {id: '', text: 'All'},
    {id: 'current', text: 'Current'},
    {id: 'harvest', text: 'Harvest'},
    {id: 'delirium', text: 'Delirium'},
    {id: 'metamorph', text: 'Metamorph'},
    {id: 'blight', text: 'Blight'},
    {id: 'legion', text: 'Legion'},
    {id: 'synthesis', text: 'Synthesis'},
    {id: 'betrayal', text: 'Betrayal'},
    {id: 'worfortheatlas', text: 'War for The Atlas'},
    {id: 'atlasofworlds', text: 'Atlas of Worlds'},
    {id: 'theawakening', text: 'The Awakening'},
    {id: 'legacy', text: 'Legacy'}
  ];               

  @Input() mapForm: FormGroup;                                             //Main item form

  constructor(public simpleDataService: SimpleDataService) {
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
}
