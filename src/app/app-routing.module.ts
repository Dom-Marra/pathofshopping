import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { 
    path: 'list/:listID', 
    loadChildren: () => import('./shoppinglist/shoppinglist.module').then(m => m.ShoppinglistModule)
  },
  { path: '', redirectTo: 'list/new', pathMatch: 'full'},
  { path: 'list', redirectTo: 'list/new', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
