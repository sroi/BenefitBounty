import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WorkflowStep4Service } from '../../services/workflow-Step4.service';

@Component({
  selector: 'app-workflow-step4-edit',
  templateUrl: './workflow-step4-edit.component.html',
  styleUrls: ['./workflow-step4-edit.component.scss']
})
export class WorkflowStep4EditComponent implements OnInit  {

  constructor(public dialogRef: MatDialogRef<WorkflowStep4EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: WorkflowStep4Service) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.data.presentValue = this.data.monetoryValue * this.data.multiplier;
    this.dataService.updateIssue(this.data);
  }

  ngOnInit() {
  }

}
