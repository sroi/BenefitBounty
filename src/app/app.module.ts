import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectAddComponent } from './project/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { MyDatePickerModule } from 'mydatepicker';
import { HttpClientModule } from '@angular/common/http';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { ProjectListModule } from './project/project-list/project-list.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TaskListModule } from './volunteer/task-list/task-list.module';
import { StakeholderProjectListComponent } from './stakeholders/stakeholder-project-list/stakeholder-project-list.component';
import { StakeHoldersModule } from './stakeholders/stakeholders.module';
import { TaskEditComponent } from './volunteer/task-edit/task-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectAddComponent,
    HeaderComponent,
    TaskListComponent,
    LoginComponent,
    SignupComponent,
    TaskEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MyDatePickerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ProjectListModule,
    TaskListModule,
    ReactiveFormsModule,
    StakeHoldersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
