import { Component, Input, OnInit } from '@angular/core';
import { CurrentsortService } from 'src/app/core/services/currentsort.service';
import { parsedModData } from '../../models/parsedModData';

@Component({
  selector: 'item-mod',
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.scss',  '../../styles/shared.scss']
})
export class ModComponent implements OnInit {

  @Input() mod: parsedModData;              //Mod Values

  constructor(public currentSort: CurrentsortService) { }

  ngOnInit(): void {
  }

}
