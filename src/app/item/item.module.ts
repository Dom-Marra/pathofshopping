import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemComponent } from './item.component';
import { ModlistComponent } from './components/modlist/modlist.component';
import { HeaderComponent } from './components/header/header.component';
import { ImageComponent } from './components/image/image.component';
import { ListinginfoComponent } from './components/listinginfo/listinginfo.component';
import { TotalvaluesComponent } from './components/totalvalues/totalvalues.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { AdditionalpropertiesComponent } from './components/additionalproperties/additionalproperties.component';
import { RequirementsComponent } from './components/requirements/requirements.component';
import { DivmodsComponent } from './components/divmods/divmods.component';
import { SortarrowComponent } from './components/sortarrow/sortarrow.component';

//Angular Material
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

//Pipes
import { ParsePropsPipePipe } from './pipes/parse-props-pipe.pipe';
import { ParseDivsPipePipe } from './pipes/parse-divs-pipe.pipe';
import { ParseModsPipePipe } from './pipes/parse-mods-pipe.pipe';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';


@NgModule({
  declarations: [
    ItemComponent,
    ModlistComponent,
    HeaderComponent,
    ImageComponent,
    ListinginfoComponent,
    TotalvaluesComponent,
    PropertiesComponent,
    AdditionalpropertiesComponent,
    RequirementsComponent,
    DivmodsComponent,
    SortarrowComponent,
    ParseModsPipePipe,
    ParseDivsPipePipe,
    ParsePropsPipePipe,
    ItemDetailsComponent,
    ProgressBarComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    MatTooltipModule
  ],
  exports: [
    ItemComponent
  ]
})
export class ItemModule { }
