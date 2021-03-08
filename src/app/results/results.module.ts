import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsComponent } from './results.component'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ItemModule } from '../item/item.module'; 

@NgModule({
  declarations: [
    ResultsComponent,
  ],
  imports: [
    CommonModule,
    ItemModule,
    MatProgressBarModule,
    MatPaginatorModule
  ],
  exports: [
    ResultsComponent
  ]
})
export class ResultsModule { }
