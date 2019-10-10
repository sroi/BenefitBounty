import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { WorkflowStep1Service } from '../../services/workflow-step1.service';
import { EstablishingScope } from 'src/app/sroi-calc/models/scope';

@Component({
  selector: 'app-workflow-step1-add',
  templateUrl: './workflow-step1-add.component.html',
  styleUrls: ['./workflow-step1-add.component.scss']
})
export class WorkflowStep1AddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WorkflowStep1AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EstablishingScope,
    public dataService: WorkflowStep1Service) { }

formControl = new FormControl('', [
Validators.required
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

public confirmAdd(): void {
this.data.id = Math.floor(Math.random() * 100);
console.log(this.data);

this.dataService.addIssue(this.data);
}

  ngOnInit() {
  }

}
