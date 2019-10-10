import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { WorkflowStep5Service } from '../../services/workflow-step5.service';


@Component({
  selector: 'app-workflow-step5-delete',
  templateUrl: './workflow-step5-delete.component.html',
  styleUrls: ['./workflow-step5-delete.component.scss']
})
export class WorkflowStep5DeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WorkflowStep5DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: WorkflowStep5Service) { }

onNoClick(): void {
this.dialogRef.close();
}

confirmDelete(): void {
this.dataService.deleteIssue(this.data.id);
}

  ngOnInit() {
  }

}

