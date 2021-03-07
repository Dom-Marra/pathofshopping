import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppinglistComponent } from './pages/shoppinglist/shoppinglist.component';

//Material Imports
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//Directives
import { DigitsonlyDirective } from './directives/digitsonly.directive';
import { EqualflexDirective } from './directives/equalflex.directive';

//Components
import { ItemFormComponent } from './components/itemForm/itemForm.component';
import { SearchSelectComponent } from './components/inputs/searchselect/searchselect.component';
import { MinmaxinputComponent } from './components/inputs/minmaxinput/minmaxinput.component';
import { StatselectComponent } from './components/inputs/statselect/statselect.component';
import { WeaponfiltersComponent } from './components/filters/weaponfilters/weaponfilters.component';
import { ArmourfiltersComponent } from './components/filters/armourfilters/armourfilters.component';
import { SocketfiltersComponent } from './components/filters/socketfilters/socketfilters.component';
import { RequirementsComponent } from './components/filters/requirements/requirements.component';
import { MapfiltersComponent } from './components/filters/mapfilters/mapfilters.component';
import { SpecialbasesComponent } from './components/filters/specialbases/specialbases.component';
import { GemfiltersComponent } from './components/filters/gemfilters/gemfilters.component';
import { OtherfiltersComponent } from './components/filters/otherfilters/otherfilters.component';
import { StatfiltersComponent } from './components/filters/statfilters/statfilters.component';
import { TypefiltersComponent } from './components/filters/typefilters/typefilters.component';
import { TradefiltersComponent } from './components/filters/tradefilters/tradefilters.component';
import { InputwrapperComponent } from './components/inputs/inputwrapper/inputwrapper.component';
import { FilteractionbuttonsComponent } from './components/filters/filteractionbuttons/filteractionbuttons.component';
import { SavedialogComponent } from './components/savedialog/savedialog.component';

import { ResultsModule } from './results/results.module';

//Angular Fire
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ShoppinglistComponent,
    DigitsonlyDirective,
    ItemFormComponent,
    EqualflexDirective,
    SearchSelectComponent,
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
    InputwrapperComponent,
    FilteractionbuttonsComponent,
    SavedialogComponent
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
    MatTabsModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    ResultsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  exports: [ ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    SavedialogComponent
  ]
})
export class AppModule { }
