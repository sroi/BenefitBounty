import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { WorkflowStep3Service } from '../../services/workflow-step3.service';

@Component({
  selector: 'app-workflow-step3-delete',
  templateUrl: './workflow-step3-delete.component.html',
  styleUrls: ['./workflow-step3-delete.component.scss']
})
export class WorkflowStep3DeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<WorkflowStep3DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: WorkflowStep3Service) { }

onNoClick(): void {
this.dialogRef.close();
}

confirmDelete(): void {
this.dataService.deleteIssue(this.data.id);
}

  ngOnInit() {
  }

}

