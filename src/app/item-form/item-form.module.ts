import { NgModule } from '@angular/core';

import { ItemFormComponent } from './itemForm.component';
import { MinmaxinputComponent } from './components/minmaxinput/minmaxinput.component';
import { StatselectComponent } from './components/statselect/statselect.component';
import { StatfiltersComponent } from './components/statfilters/statfilters.component';
import { InputwrapperComponent } from './components/inputwrapper/inputwrapper.component';
import { FilteractionbuttonsComponent } from './components/filteractionbuttons/filteractionbuttons.component';
import { DigitsonlyDirective } from './directives/digitsonly.directive';

import { ResultsModule } from '../results/results.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SharedModule } from '../shared/shared.module';

import { ItemFormRoutingModule } from './item-form-routing.module';
import { FilterGroupComponent } from './components/filter-group/filter-group.component';
import { ItemSearchComponent } from './components/item-search/item-search.component';

@NgModule({
  declarations: [
    DigitsonlyDirective,
    ItemFormComponent,
    MinmaxinputComponent,
    StatselectComponent,
    StatfiltersComponent,
    FilteractionbuttonsComponent,
    InputwrapperComponent,
    FilterGroupComponent,
    ItemSearchComponent
  ],
  imports: [
    ItemFormRoutingModule,
    ResultsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    MatAutocompleteModule
  ],
  exports: [
    ItemFormComponent
  ]
})
export class ItemFormModule { }
