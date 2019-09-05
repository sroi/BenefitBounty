import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectAddComponent } from './project';


const routes: Routes = [
  {path:'project', component:ProjectListComponent},
  {path:'add', component:ProjectAddComponent},
  {path:'project/edit', redirectTo:'add',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
