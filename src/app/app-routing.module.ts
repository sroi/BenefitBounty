import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPrComponent } from './admin-pr/admin-pr.component';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { TemplatesComponent } from './templates/templates.component';


const routes: Routes = [ 
  { path: 'projects', component: AdminPrComponent},
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'reports', component: ReportsComponent},
  { path:'templates', component: TemplatesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
