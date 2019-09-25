import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectAddComponent } from './project';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {path:'project', component:ProjectListComponent},
  {path:'add', component:ProjectAddComponent},
  {path:'project/edit', redirectTo:'add',pathMatch:'full'},
  {path:'task', component:TaskListComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'project/task',redirectTo:'task',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
