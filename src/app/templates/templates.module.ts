import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesComponent } from './templates.component';



@NgModule({
  declarations: [TemplatesComponent],
  imports: [
    CommonModule,
    // TemplatesComponent
  ],
  exports: [TemplatesComponent]
})
export class TemplatesModule { }
