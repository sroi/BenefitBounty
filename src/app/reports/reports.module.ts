import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';



@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    ReportsComponent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class ReportsModule { }
