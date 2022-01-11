import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppinglistComponent } from './shoppinglist.component';

const routes: Routes = [
  {
    path: '', component: ShoppinglistComponent,
    children: [
      {
        path: 'form/:itemID',
        loadChildren: () => import('../item-form/item-form.module').then(m => m.ItemFormModule)
      },
      {
        path: 'form/:itemID/results',
        loadChildren: () => import('../results/results.module').then(m => m.ResultsModule)
      },
      {
        path: 'form',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: 'results',
        redirectTo: '',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppinglistRoutingModule { }
