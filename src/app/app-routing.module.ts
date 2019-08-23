import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPrComponent } from './admin-pr/admin-pr.component';


const routes: Routes = [ { path: 'adminpr', component: AdminPrComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
