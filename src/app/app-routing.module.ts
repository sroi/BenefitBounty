import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectAddComponent } from './project';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TaskListComponent } from './volunteer/task-list/task-list.component';
import { StakeholderProjectListComponent } from './stakeholders/stakeholder-project-list/stakeholder-project-list.component';
import { StakeholderProjectDetailComponent } from './stakeholders/stakeholder-project-detail/stakeholder-project-detail.component';
import { TaskEditComponent } from './volunteer/task-edit/task-edit.component';
import { HomeComponent } from './home/home.component';
import { TaskList1Component } from './approver/task-list/task-list.component';

const routes: Routes = [
  {path:'admin', component:ProjectListComponent},
  {path:'home', component:HomeComponent},
  {path:'add', component:ProjectAddComponent},
  {path:'project/edit', redirectTo:'add',pathMatch:'full'},
  {path:'volunteer', component:TaskListComponent},
  {path:'taskEdit',component:TaskEditComponent},
  {path:'task/edit',redirectTo:'taskEdit',pathMatch:'full'},
  {path:'approver', component:TaskList1Component},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'project/task',redirectTo:'task',pathMatch:'full'},
  { path: 'stakeholder', component: StakeholderProjectListComponent, children: [
    { path: ':id', component: StakeholderProjectDetailComponent}
  ]} ,
  { path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
