import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule, MatTooltipModule } from '@angular/material';
import { ProjectListComponent } from './project-list.component';
import { RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select'


@NgModule({
  declarations: [ProjectListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    AgGridModule.withComponents([]),
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule 
  ],
  exports: [
    ProjectListComponent
  ]
})
export class ProjectListModule { }
