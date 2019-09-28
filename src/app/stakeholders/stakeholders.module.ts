import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select'
import { StakeholderProjectListComponent } from './stakeholder-project-list/stakeholder-project-list.component';
import { StakeholderProjectDetailComponent } from './stakeholder-project-detail/stakeholder-project-detail.component';
import { StakeHolderService } from './stakeholder.service';


@NgModule({
  declarations: [StakeholderProjectListComponent, StakeholderProjectDetailComponent],
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
    MatSelectModule
  ],
  exports: [
  ],
  providers: [DatePipe, StakeHolderService]
})
export class StakeHoldersModule { }
