import { NgModule } from '@angular/core';

import { ShoppinglistComponent } from './shoppinglist.component';
import { SavedialogComponent } from './components/savedialog/savedialog.component';

import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { ShoppinglistRoutingModule } from './shoppinglist-routing.module';
@NgModule({
  declarations: [
    ShoppinglistComponent,
    SavedialogComponent
  ],
  imports: [
    SharedModule,
    MatIconModule,
    ClipboardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatRippleModule,
    ShoppinglistRoutingModule
  ],
  entryComponents: [
    SavedialogComponent
  ],
  providers: []
})
export class ShoppinglistModule { }
