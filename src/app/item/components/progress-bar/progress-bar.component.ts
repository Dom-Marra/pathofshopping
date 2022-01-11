import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pos-item-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() progress: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
