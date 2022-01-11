import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components
import { SearchSelectComponent } from './components/searchselect/searchselect.component';

//Material Modules
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditableFieldComponent } from './components/editable-field/editable-field.component';

@NgModule({
  declarations: [ 
    SearchSelectComponent,
    EditableFieldComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SearchSelectComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    EditableFieldComponent
  ]
})
export class SharedModule { }
