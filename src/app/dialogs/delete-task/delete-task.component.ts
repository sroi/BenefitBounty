import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';
import { Tasks } from 'src/app/_models/issue';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent {

  constructor(public dialogRef: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tasks, public dataService: DataService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
  
    confirmDelete(): void {
      this.dataService.deleteTask(this.data);
    }

}
