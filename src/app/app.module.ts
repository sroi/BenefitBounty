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
import { DataService } from './services/data.service';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import {
  MatNativeDateModule, MatSnackBarModule, MatIconModule, MatDialogModule,
  MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatTabsModule,
  MatCheckboxModule, MatToolbarModule, MatCard, MatCardModule, MatFormField,
  MatFormFieldModule, MatProgressSpinnerModule, MatInputModule,
  MatStepperModule, MatMenuModule, MatSidenavModule, MatListModule,MatDatepickerModule,
  MatRadioModule,MatSelectModule,MatSliderModule,MatDividerModule, MatExpansionModule, MatTooltipModule
  
} from '@angular/material';

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
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';
import { UserCommentsComponent } from './dialogs/user-comments/user-comments.component';
import { ShowMessageComponent } from './dialogs/show-message/show-message.component';
import { ApproverCommentComponent } from './dialogs/approver-comment/approver-comment.component';
import { SroiWorkflowComponent } from './sroi-calc/sroi-workflow/sroi-workflow.component';
import { WorkflowStep1Component } from './sroi-calc/workflow-step1/workflow-step1.component';
import { WorkflowStep1AddComponent } from './sroi-calc/workflow-step1/dialogs/workflow-step1-add/workflow-step1-add.component';
import { WorkflowStep1DeleteComponent } from './sroi-calc/workflow-step1/dialogs/workflow-step1-delete/workflow-step1-delete.component';
import { WorkflowStep1EditComponent } from './sroi-calc/workflow-step1/dialogs/workflow-step1-edit/workflow-step1-edit.component';
import { WorkflowStep2Component } from './sroi-calc/workflow-step2/workflow-step2.component';
import { WorkflowStep2AddComponent } from './sroi-calc/workflow-step2/dialogs/workflow-step2-add/workflow-step2-add.component';
import { WorkflowStep2DeleteComponent } from './sroi-calc/workflow-step2/dialogs/workflow-step2-delete/workflow-step2-delete.component';
import { WorkflowStep2EditComponent } from './sroi-calc/workflow-step2/dialogs/workflow-step2-edit/workflow-step2-edit.component';
import { WorkflowStep3Component } from './sroi-calc/workflow-step3/workflow-step3.component';
import { WorkflowStep3AddComponent } from './sroi-calc/workflow-step3/dialogs/workflow-step3-add/workflow-step3-add.component';
import { WorkflowStep3DeleteComponent } from './sroi-calc/workflow-step3/dialogs/workflow-step3-delete/workflow-step3-delete.component';
import { WorkflowStep3EditComponent } from './sroi-calc/workflow-step3/dialogs/workflow-step3-edit/workflow-step3-edit.component';
import { WorkflowStep4Component } from './sroi-calc/workflow-step4/workflow-step4.component';
import { WorkflowStep4AddComponent } from './sroi-calc/workflow-step4/dialogs/workflow-Step4-add/workflow-Step4-add.component';
import { WorkflowStep4DeleteComponent } from './sroi-calc/workflow-step4/dialogs/workflow-Step4-delete/workflow-Step4-delete.component';
import { WorkflowStep4EditComponent } from './sroi-calc/workflow-step4/dialogs/workflow-Step4-edit/workflow-Step4-edit.component';
import { WorkflowStep5Component } from './sroi-calc/workflow-step5/workflow-step5.component';
import { WorkflowStep5AddComponent } from './sroi-calc/workflow-step5/dialogs/workflow-step5-add/workflow-step5-add.component';
import { WorkflowStep5DeleteComponent } from './sroi-calc/workflow-step5/dialogs/workflow-step5-delete/workflow-step5-delete.component';
import { WorkflowStep5EditComponent } from './sroi-calc/workflow-step5/dialogs/workflow-step5-edit/workflow-step5-edit.component';
import { WorkflowStep6Component } from './sroi-calc/workflow-step6/workflow-step6.component';
import { WorkflowProjectDetailComponent } from './sroi-calc/workflow-project-detail/workflow-project-detail.component';

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
    FileDropDirective,
    UserCommentsComponent,
    ShowMessageComponent,
    ApproverCommentComponent,
    SroiWorkflowComponent,
    WorkflowStep1Component,
    WorkflowStep1AddComponent,
    WorkflowStep1DeleteComponent,
    WorkflowStep1EditComponent,
    WorkflowStep2Component,
    WorkflowStep2AddComponent,
    WorkflowStep2DeleteComponent,
    WorkflowStep2EditComponent,
    WorkflowStep3Component,
    WorkflowStep3AddComponent,
    WorkflowStep3DeleteComponent,
    WorkflowStep3EditComponent,
    WorkflowStep4Component,
    WorkflowStep4AddComponent,
    WorkflowStep4DeleteComponent,
    WorkflowStep4EditComponent,
    WorkflowStep5Component,
    WorkflowStep5AddComponent,
    WorkflowStep5DeleteComponent,
    WorkflowStep5EditComponent,
    WorkflowStep6Component,
    WorkflowProjectDetailComponent
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
    FlexLayoutModule,
    TaskList1Module,
    MatCardModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, 
    MatTabsModule,
    MatCheckboxModule, 
    MatToolbarModule, 
    MatFormFieldModule, 
    MatProgressSpinnerModule, 
    MatInputModule,
    MatStepperModule, 
    MatMenuModule, 
    MatSidenavModule, 
    MatListModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatDividerModule,
    MatExpansionModule,
    MatTooltipModule 
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
    EditVolunteerComponent,
    UserCommentsComponent,
    ShowMessageComponent,
    ApproverCommentComponent,
    WorkflowStep1AddComponent,
    WorkflowStep1EditComponent,
    WorkflowStep1DeleteComponent,
    WorkflowStep2AddComponent,
    WorkflowStep2EditComponent,
    WorkflowStep2DeleteComponent,
    WorkflowStep3AddComponent,
    WorkflowStep3DeleteComponent,
    WorkflowStep3EditComponent,
    WorkflowStep4AddComponent,
    WorkflowStep4DeleteComponent,
    WorkflowStep4EditComponent,
    WorkflowStep5AddComponent,
    WorkflowStep5DeleteComponent,
    WorkflowStep5EditComponent
  ],
  exports: [
    MatCardModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, 
    MatTabsModule,
    MatCheckboxModule, 
    MatToolbarModule, 
    MatCard, 
    MatFormField,
    MatFormFieldModule, 
    MatProgressSpinnerModule, 
    MatInputModule,
    MatStepperModule, 
    MatMenuModule, 
    MatSidenavModule, 
    MatListModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatDividerModule,
    MatExpansionModule],
  providers: [CommonService, DataService, FileUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
