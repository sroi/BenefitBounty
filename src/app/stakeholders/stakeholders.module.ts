import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';


import { StakeholderProjectListComponent } from './stakeholder-project-list/stakeholder-project-list.component';
import { StakeholderProjectDetailComponent } from './stakeholder-project-detail/stakeholder-project-detail.component';
import { StakeHolderService } from './stakeholder.service';
import { StakeholdersHeaderComponent } from './stakeholders-header/stakeholders-header.component';


@NgModule({
  declarations: [StakeholderProjectListComponent, StakeholderProjectDetailComponent, StakeholdersHeaderComponent],
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
    MatTooltipModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [
    StakeholdersHeaderComponent
  ],
  providers: [DatePipe, StakeHolderService]
})
export class StakeHoldersModule { }
