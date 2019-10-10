import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { WorkflowStep5Service } from '../../services/workflow-step5.service';
import { NetPresentValue } from 'src/app/sroi-calc/models/net-present-value';

@Component({
  selector: 'app-workflow-step5-add',
  templateUrl: './workflow-step5-add.component.html',
  styleUrls: ['./workflow-step5-add.component.scss']
})
export class WorkflowStep5AddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WorkflowStep5AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NetPresentValue,
    public dataService: WorkflowStep5Service) { }

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

