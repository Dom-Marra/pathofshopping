import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Directives
import { EqualflexDirective } from './directives/equalflex.directive';

//Components
import { SearchSelectComponent } from './components/searchselect/searchselect.component';

//Material Modules
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ 
    SearchSelectComponent,
    EqualflexDirective
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    SearchSelectComponent,
    EqualflexDirective
  ]
})
export class SharedModule { }
