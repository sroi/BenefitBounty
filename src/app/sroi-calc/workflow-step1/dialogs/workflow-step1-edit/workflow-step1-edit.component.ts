
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WorkflowStep1Service } from '../../services/workflow-step1.service';

@Component({
  selector: 'app-workflow-step1-edit',
  templateUrl: './workflow-step1-edit.component.html',
  styleUrls: ['./workflow-step1-edit.component.scss']
})
export class WorkflowStep1EditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WorkflowStep1EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: WorkflowStep1Service) { }

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
    this.dataService.updateIssue(this.data);
  }

  ngOnInit() {
  }

}
