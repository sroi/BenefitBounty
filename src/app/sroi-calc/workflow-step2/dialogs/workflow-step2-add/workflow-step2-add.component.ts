import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { WorkflowStep2Service } from '../../services/workflow-step2.service';
import { Stackholder } from 'src/app/sroi-calc/models/stackholder';

@Component({
  selector: 'app-workflow-step2-add',
  templateUrl: './workflow-step2-add.component.html',
  styleUrls: ['./workflow-step2-add.component.scss']
})
export class WorkflowStep2AddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WorkflowStep2AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Stackholder,
    public dataService: WorkflowStep2Service) { }

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

