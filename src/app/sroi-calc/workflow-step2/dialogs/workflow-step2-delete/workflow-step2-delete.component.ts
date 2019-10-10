import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { WorkflowStep2Service } from '../../services/workflow-step2.service';

@Component({
  selector: 'app-workflow-step2-delete',
  templateUrl: './workflow-step2-delete.component.html',
  styleUrls: ['./workflow-step2-delete.component.scss']
})
export class WorkflowStep2DeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WorkflowStep2DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: WorkflowStep2Service) { }

onNoClick(): void {
this.dialogRef.close();
}

confirmDelete(): void {
this.dataService.deleteIssue(this.data.id);
}

  ngOnInit() {
  }

}

