import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewRef } from '@angular/core';
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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//Components
import { DigitsonlyDirective } from './directives/digitsonly.directive';
import { ItemComponent } from './components/item/item.component';
import { EqualflexDirective } from './directives/equalflex.directive';
import { FiltergroupselectComponent } from './components/inputs/filtergroupselect/filtergroupselect.component';
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
import { ResultsComponent, ParseModsPipe, ParserPipe, ParseDivsPipe} from './components/results/results.component';
import { TradefiltersComponent } from './components/filters/tradefilters/tradefilters.component';
import { InputwrapperComponent } from './components/inputs/inputwrapper/inputwrapper.component';
import { FilteractionbuttonsComponent } from './components/filters/filteractionbuttons/filteractionbuttons.component';
import { SavedialogComponent } from './components/savedialog/savedialog.component';

//Angular Fire
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

//Adsense
import { AdsenseModule } from 'ng2-adsense';

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
    ParseDivsPipe,
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
    MatProgressBarModule,
    MatTabsModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-3594808744469486'
    })
  ],
  exports: [ ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    SavedialogComponent
  ]
})
export class AppModule { }
