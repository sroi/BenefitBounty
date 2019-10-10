import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { WorkflowStep3Service } from '../../services/workflow-step3.service';
import { ImpactMap } from 'src/app/sroi-calc/models/impact-map';

@Component({
  selector: 'app-workflow-step3-add',
  templateUrl: './workflow-step3-add.component.html',
  styleUrls: ['./workflow-step3-add.component.scss']
})
export class WorkflowStep3AddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WorkflowStep3AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImpactMap,
    public dataService: WorkflowStep3Service) { }

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

