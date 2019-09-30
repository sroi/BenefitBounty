import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StakeHolderService } from '../stakeholder.service';
import { MatTableDataSource } from '@angular/material';
import { Projects, Tasks } from 'src/app/project/project-list/project-list.component';
import { TASK_CONFIG_COLUMNS } from '../config';
import { Volunteers } from 'src/app/volunteer/task-list/task-list.component';
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
  taskDetails: Tasks;
  volunteer: Volunteers;
  isTaskLoaded: boolean = false;
  isLoaded: boolean = true;
  isImage: boolean = false;
  image: string = "./../../../assets/angularLogo.svg";
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
    // this.columnHeaders.push('delete');
  }

  showTaskDetails(temp) {
    this.taskDetails = temp;
    this.volunteer = temp.volunteers;
    console.log(this.volunteer);
    this.isTaskLoaded = true;
    this.isLoaded = false;
  }

  hideTaskDetails() {
    this.isTaskLoaded = false;
    this.isLoaded = true;
  }

  showImage() {
    this.isImage = true;
  }
  hideImage() {
    this.isImage = false;
  }
  
  deleteTask(temp: any) {
    this.stakeHolderService.deleteTask(temp);
  }

}
