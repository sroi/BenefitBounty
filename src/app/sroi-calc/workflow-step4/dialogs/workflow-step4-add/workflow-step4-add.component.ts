
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { PresentValue } from 'src/app/sroi-calc/models/present-value';
import { WorkflowStep4Service } from '../../services/workflow-Step4.service';

@Component({
  selector: 'app-workflow-step4-add',
  templateUrl: './workflow-step4-add.component.html',
  styleUrls: ['./workflow-step4-add.component.scss']
})
export class WorkflowStep4AddComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<WorkflowStep4AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PresentValue,
    public dataService: WorkflowStep4Service) { }

formControl = new FormControl('', [
Validators.required,
Validators.pattern("^[0-9]*$")
]);

getErrorMessage() {
return this.formControl.hasError('required') ? 'Required field' :
this.formControl.hasError('pattern') ? 'Not a valid number' :
'';
}

submit() {
// emppty stuff
}

onNoClick(): void {
this.dialogRef.close();
}

public confirmAdd(): void {
this.data.id = Math.floor(Math.random() * 100);
console.log(this.data);

this.dataService.addIssue(this.data);
}

  ngOnInit() {
  }

}

