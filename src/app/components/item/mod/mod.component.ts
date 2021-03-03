import { Component, Input, OnInit } from '@angular/core';
import { parsedModData } from 'src/app/models/parsedModData';
import { CurrentsortService } from 'src/app/services/currentsort.service';

@Component({
  selector: 'app-mod',
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.scss',  '../shared.scss']
})
export class ModComponent implements OnInit {

  @Input() mod: parsedModData;              //Mod Values

  constructor(public currentSort: CurrentsortService) { }

  ngOnInit(): void {
  }

}
