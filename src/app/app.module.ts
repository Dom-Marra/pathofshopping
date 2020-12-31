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

//Feather Import
import { DigitsonlyDirective } from './digitsonly.directive';
import { ItemComponent } from './shoppinglist/item/item.component';
import { EqualflexDirective } from './equalflex.directive';
import { FiltergroupselectComponent } from './shoppinglist/filtergroupselect/filtergroupselect.component';
import { MinmaxinputComponent } from './shoppinglist/minmaxinput/minmaxinput.component';
import { StatselectComponent } from './shoppinglist/statselect/statselect.component';



@NgModule({
  declarations: [
    AppComponent,
    ShoppinglistComponent,
    DigitsonlyDirective,
    ItemComponent,
    EqualflexDirective,
    FiltergroupselectComponent,
    MinmaxinputComponent,
    StatselectComponent
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
    MatIconModule
  ],
  exports: [ ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
