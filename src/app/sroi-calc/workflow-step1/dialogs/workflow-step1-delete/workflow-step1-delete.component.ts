import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { WorkflowStep1Service } from '../../services/workflow-step1.service';

@Component({
  selector: 'app-workflow-step1-delete',
  templateUrl: './workflow-step1-delete.component.html',
  styleUrls: ['./workflow-step1-delete.component.scss']
})
export class WorkflowStep1DeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WorkflowStep1DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: WorkflowStep1Service) { }

onNoClick(): void {
this.dialogRef.close();
}

confirmDelete(): void {
this.dataService.deleteIssue(this.data.id);
}

  ngOnInit() {
  }

}
