import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPrComponent } from './admin-pr.component';



@NgModule({
  declarations: [AdminPrComponent],
  imports: [
    CommonModule
  ],
  exports: [AdminPrComponent]
  //entryComponents: [AdminPrComponent]
})
export class AdminPrModule { }
