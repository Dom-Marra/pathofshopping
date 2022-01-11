import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SimpleDataService } from 'src/app/core/services/simpledata.service';
import { FilterGroup } from '../../classes/filter-group';

@Component({
  selector: 'pos-filter-group',
  templateUrl: './filter-group.component.html',
  styleUrls: ['./filter-group.component.scss']
})
export class FilterGroupComponent implements OnInit {

  @Input() group: {filterGroup: FilterGroup, formGroup: FormGroup};
  @Input() noExpansion: boolean = false;
  @Input() wrapInputs: boolean;

  constructor(public simpleDataService: SimpleDataService) { 
  }

  ngOnInit(): void {
  }

}
