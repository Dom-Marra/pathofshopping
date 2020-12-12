import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';

//Material Imports
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

//Feather Import
import { FeatherModule } from 'angular-feather';
import { ChevronDown, ChevronUp, Save, Download, Trash2, PlusCircle, Edit2, X } from 'angular-feather/icons';
import { DigitsonlyDirective } from './digitsonly.directive';
import { ItemComponent } from './shoppinglist/item/item.component';

const icons = {         //Feather Icons
  ChevronDown,
  ChevronUp,
  Save,
  Download,
  Trash2,
  PlusCircle,
  Edit2,
  X
}

@NgModule({
  declarations: [
    AppComponent,
    ShoppinglistComponent,
    DigitsonlyDirective,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatherModule.pick(icons),
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule
  ],
  exports: [
    FeatherModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
