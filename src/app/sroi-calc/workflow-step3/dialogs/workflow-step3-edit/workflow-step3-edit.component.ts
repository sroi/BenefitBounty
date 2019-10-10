import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WorkflowStep3Service } from '../../services/workflow-step3.service';

@Component({
  selector: 'app-workflow-step3-edit',
  templateUrl: './workflow-step3-edit.component.html',
  styleUrls: ['./workflow-step3-edit.component.scss']
})
export class WorkflowStep3EditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WorkflowStep3EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: WorkflowStep3Service) { }

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
