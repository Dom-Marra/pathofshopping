import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';

//Material Imports
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatProgressBarModule } from '@angular/material/progress-bar';

//Feather Import
import { DigitsonlyDirective } from './digitsonly.directive';
import { ItemComponent } from './shoppinglist/item/item.component';
import { EqualflexDirective } from './equalflex.directive';
import { FiltergroupselectComponent } from './shoppinglist/filtergroupselect/filtergroupselect.component';
import { MinmaxinputComponent } from './shoppinglist/minmaxinput/minmaxinput.component';
import { StatselectComponent } from './shoppinglist/statselect/statselect.component';
import { WeaponfiltersComponent } from './shoppinglist/filters/weaponfilters/weaponfilters.component';
import { ArmourfiltersComponent } from './shoppinglist/filters/armourfilters/armourfilters.component';
import { SocketfiltersComponent } from './shoppinglist/filters/socketfilters/socketfilters.component';
import { RequirementsComponent } from './shoppinglist/filters/requirements/requirements.component';
import { MapfiltersComponent } from './shoppinglist/filters/mapfilters/mapfilters.component';
import { SpecialbasesComponent } from './shoppinglist/filters/specialbases/specialbases.component';
import { GemfiltersComponent } from './shoppinglist/filters/gemfilters/gemfilters.component';
import { OtherfiltersComponent } from './shoppinglist/filters/otherfilters/otherfilters.component';
import { StatfiltersComponent } from './shoppinglist/filters/statfilters/statfilters.component';
import { TypefiltersComponent } from './shoppinglist/filters/typefilters/typefilters.component';
import { ResultsComponent, ParseModsPipe, ParserPipe, ParseDivsPipe} from './shoppinglist/item/results/results.component';



@NgModule({
  declarations: [
    AppComponent,
    ShoppinglistComponent,
    DigitsonlyDirective,
    ItemComponent,
    EqualflexDirective,
    FiltergroupselectComponent,
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
    ResultsComponent,
    ParseModsPipe,
    ParserPipe,
    ParseDivsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatIconModule,
    ClipboardModule,
    MatProgressBarModule
  ],
  exports: [ ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
