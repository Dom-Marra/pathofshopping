import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Components
import { ShoppinglistComponent } from './pages/shoppinglist/shoppinglist.component';
import { SavedialogComponent } from './components/savedialog/savedialog.component';

//Material Imports
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ItemFormModule } from './item-form/item-form.module';
import { SharedModule } from './shared/shared.module';

//Angular Fire
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ShoppinglistComponent,
    SavedialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatIconModule,
    ClipboardModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    ItemFormModule,
    SharedModule,
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
