import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { WorkflowStep4Service } from '../../services/workflow-Step4.service';

@Component({
  selector: 'app-workflow-step4-delete',
  templateUrl: './workflow-step4-delete.component.html',
  styleUrls: ['./workflow-step4-delete.component.scss']
})
export class WorkflowStep4DeleteComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<WorkflowStep4DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: WorkflowStep4Service) { }

onNoClick(): void {
this.dialogRef.close();
}

confirmDelete(): void {
this.dataService.deleteIssue(this.data.id);
}

  ngOnInit() {
  }

}

