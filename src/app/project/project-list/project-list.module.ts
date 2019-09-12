import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { ProjectListComponent } from './project-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProjectListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,RouterModule
  ],
  exports: [
    ProjectListComponent
  ]
})
export class ProjectListModule { }
