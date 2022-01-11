import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTooltipModule } from '@angular/material/tooltip';
import { ResultsComponent } from './results.component'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { ItemModule } from '../item/item.module'; 
import { ResultsRoutingModule } from './results-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CustomPaginatorIntl } from './custom-paginator-intl';

@NgModule({
  declarations: [
    ResultsComponent,
  ],
  imports: [
    ResultsRoutingModule,
    CommonModule,
    ItemModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule
  ],
  exports: [
    ResultsComponent
  ],
  providers:[
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginatorIntl
    }
  ]
})
export class ResultsModule { }
