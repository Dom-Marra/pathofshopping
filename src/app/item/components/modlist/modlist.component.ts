import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SortProperties } from 'src/app/core/models/sort-properties';
import { SortService } from 'src/app/core/services/currentsort.service';
import { ModProperties } from 'src/app/item/models/mod-properties';

@Component({
  selector: 'pos-item-modlist',
  templateUrl: './modlist.component.html',
  styleUrls: ['../../styles/parsedlist.scss', './modlist.component.scss']
})
export class ModlistComponent implements OnInit {

  @Input() modProperties: Array<ModProperties>;   //Mod properties

  @Input() item: any;                             //Item Values

  public currentSort: Observable<SortProperties>;

  constructor(public sortService: SortService) { 
    this.currentSort = this.sortService.getSort();
  }

  ngOnInit(): void {
  }

}
