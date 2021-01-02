import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { trueFlase } from './../trueFalseEnum';

enum mapSeries {
  all = 'All',
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
  all = "All",
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
    disabled: new FormControl(false),
    filters: new FormGroup({
      map_region: new FormGroup(
        {option: new FormControl('all')}
      ),
      map_series: new FormGroup(
        {option: new FormControl('all')}
      ),
      map_shaped: new FormGroup(
        {option: new FormControl('all')}
      ),
      map_elder: new FormGroup(
        {option: new FormControl('all')}
      ),
      map_blighted: new FormGroup(
        {option: new FormControl('all')}
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
    this.itemForm.addControl('map_filters', this.mapFilters);
  }

}
