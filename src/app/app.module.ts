import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';

//Material Imports
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

//Feather Import
import { FeatherModule } from 'angular-feather';
import { ChevronDown, ChevronUp, Save, Download, Trash2, PlusCircle } from 'angular-feather/icons';
import { DigitsonlyDirective } from './digitsonly.directive';

const icons = {         //Feather Icons
  ChevronDown,
  ChevronUp,
  Save,
  Download,
  Trash2,
  PlusCircle
}

@NgModule({
  declarations: [
    AppComponent,
    ShoppinglistComponent,
    DigitsonlyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatherModule.pick(icons),
    MatSelectModule,
    MatInputModule
  ],
  exports: [
    FeatherModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
