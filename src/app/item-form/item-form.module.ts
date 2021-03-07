import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemFormComponent } from './itemForm.component';
import { MinmaxinputComponent } from './components/minmaxinput/minmaxinput.component';
import { StatselectComponent } from './components/statselect/statselect.component';
import { WeaponfiltersComponent } from './components/weaponfilters/weaponfilters.component';
import { ArmourfiltersComponent } from './components/armourfilters/armourfilters.component';
import { SocketfiltersComponent } from './components/socketfilters/socketfilters.component';
import { RequirementsComponent } from './components/requirements/requirements.component';
import { MapfiltersComponent } from './components/mapfilters/mapfilters.component';
import { SpecialbasesComponent } from './components/specialbases/specialbases.component';
import { GemfiltersComponent } from './components/gemfilters/gemfilters.component';
import { OtherfiltersComponent } from './components/otherfilters/otherfilters.component';
import { StatfiltersComponent } from './components/statfilters/statfilters.component';
import { TypefiltersComponent } from './components/typefilters/typefilters.component';
import { TradefiltersComponent } from './components/tradefilters/tradefilters.component';
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

@NgModule({
  declarations: [
    DigitsonlyDirective,
    ItemFormComponent,
    MinmaxinputComponent,
    StatselectComponent,
    WeaponfiltersComponent,
    ArmourfiltersComponent,
    SocketfiltersComponent,
    RequirementsComponent,
    MapfiltersComponent,
    SpecialbasesComponent,
    GemfiltersComponent,
    OtherfiltersComponent,
    StatfiltersComponent,
    TypefiltersComponent,
    TradefiltersComponent,
    FilteractionbuttonsComponent,
    InputwrapperComponent
  ],
  imports: [
    CommonModule,
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
