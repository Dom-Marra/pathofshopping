import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';

const routes: Routes = [
  { path: '', redirectTo: 'shoppinglist', pathMatch: 'full'},
  { path: 'shoppinglist', component: ShoppinglistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
