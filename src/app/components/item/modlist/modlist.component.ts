import { Component, Input, OnInit } from '@angular/core';
import { modProperties } from 'src/app/models/modProperties';

@Component({
  selector: 'app-modlist',
  templateUrl: './modlist.component.html',
  styleUrls: ['./modlist.component.scss']
})
export class ModlistComponent implements OnInit {

  @Input() modProperties: Array<modProperties>;   //Mod properties

  @Input() item: any;                             //Item Values

  constructor() { }

  ngOnInit(): void {
  }

}
