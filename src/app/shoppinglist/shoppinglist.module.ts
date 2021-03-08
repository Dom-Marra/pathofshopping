import { NgModule } from '@angular/core';

import { ShoppinglistComponent } from './shoppinglist.component';
import { SavedialogComponent } from './components/savedialog/savedialog.component';

import { ItemFormModule } from '../item-form/item-form.module';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ShoppinglistComponent,
    SavedialogComponent
  ],
  imports: [
    ItemFormModule,
    SharedModule,
    MatIconModule,
    ClipboardModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    ShoppinglistComponent
  ],
  entryComponents: [
    SavedialogComponent
  ]
})
export class ShoppinglistModule { }
