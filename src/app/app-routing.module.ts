import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectAddComponent } from './project';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TaskListComponent } from './volunteer/task-list/task-list.component';
import { StakeholderProjectListComponent } from './stakeholders/stakeholder-project-list/stakeholder-project-list.component';
import { StakeholderProjectDetailComponent } from './stakeholders/stakeholder-project-detail/stakeholder-project-detail.component';


const routes: Routes = [
  {path:'project', component:ProjectListComponent},

  {path:'add', component:ProjectAddComponent},
  {path:'project/edit', redirectTo:'add',pathMatch:'full'},
  {path:'task', component:TaskListComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'project/task',redirectTo:'task',pathMatch:'full'},
  { path: 'stakeholders/projects', component: StakeholderProjectListComponent, children: [
    { path: ':id', component: StakeholderProjectDetailComponent}
  ]} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
