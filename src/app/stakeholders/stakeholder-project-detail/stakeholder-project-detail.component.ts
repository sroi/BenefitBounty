import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StakeHolderService } from '../stakeholder.service';
import { MatTableDataSource } from '@angular/material';
import { Projects } from 'src/app/project/project-list/project-list.component';
import { TASK_CONFIG_COLUMNS } from '../config';
@Component({
  selector: 'app-stakeholder-project-detail',
  templateUrl: './stakeholder-project-detail.component.html',
  styleUrls: ['./stakeholder-project-detail.component.scss']
})
export class StakeholderProjectDetailComponent implements OnInit {
  projectId: string;
  project: any;
  taskSource = new MatTableDataSource<Projects>();
  columnHeaders: string[] = [];
  tableData: Array<any> = [];
  tasksColumnsConfig: Array<{id: string, label: string, type?: string}> = TASK_CONFIG_COLUMNS;
  constructor(private route: ActivatedRoute, private stakeHolderService: StakeHolderService) {
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      this.project = this.stakeHolderService.getProject(this.projectId);
      this.stakeHolderService.fetchTasks(this.projectId);
      this.stakeHolderService.tasksloadedEvent.subscribe(tasks => {
        this.tableData = tasks;
        this.taskSource.data = this.tableData;
      });
    });
    this.columnHeaders = this.tasksColumnsConfig.map(taskColumn => {
      return taskColumn.id;
    });
    this.columnHeaders.push('delete');
  }
  deleteTask(temp: any) {
    this.stakeHolderService.deleteTask(temp);
  }

}
