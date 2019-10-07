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
import { VolunteerHeaderComponent } from './volunteer/volunteer-header/volunteer-header.component';
import { CommonService } from './shared/common.service';
import { HomeComponent } from './home/home.component';
import { TaskList1Component } from './approver/task-list/task-list.component';
import {DataService} from './services/data.service';
import {AddDialogComponent} from './dialogs/add/add.dialog.component';
import {EditDialogComponent} from './dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.dialog.component';
import { MatInputModule,MatIconModule, MatFormFieldModule, MatDialogModule, MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PhotoComponent } from './shared/photo/photo.component';


import { TaskList1Module } from './approver/task-list/task-list.module';
import { AddTaskComponent } from './dialogs/add-task/add-task.component';
import { DeleteTaskComponent } from './dialogs/delete-task/delete-task.component';
import { EditTaskComponent } from './dialogs/edit-task/edit-task.component';
import { CommentComponent } from './dialogs/comment/comment.component';
import { EditVolunteerComponent } from './dialogs/edit-volunteer/edit-volunteer.component';
import { FileuploadComponent } from './widgets/fileupload.component';
import { FileUploadService } from './services/fileUpload.service';
import { FileDropDirective, FileSelectDirective} from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    ProjectAddComponent,
    HeaderComponent,
    TaskListComponent,
    LoginComponent,
    SignupComponent,
    TaskEditComponent,
    VolunteerHeaderComponent,
    HomeComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    PhotoComponent,
    AddTaskComponent,
    DeleteTaskComponent,
    EditTaskComponent,
    CommentComponent,
    EditVolunteerComponent,
    FileuploadComponent,
    FileSelectDirective,
    FileDropDirective
    
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
    StakeHoldersModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,MatButtonModule,
    MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule,
    FlexLayoutModule,
    MatCardModule,
    MatDialogModule,
    TaskList1Module
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    PhotoComponent,
    AddTaskComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    CommentComponent,
    EditVolunteerComponent
  ],
  providers: [CommonService,DataService,FileUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
