import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Project } from 'src/app/project/_model';
import { WorkflowProjectDetailService } from './services/workflow-project-detail.service';
import { DatePipe } from '@angular/common'
import { ProjectDetailInfo, ProjectInfo } from '../models/project-detail';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Task } from 'src/app/_models/model';

@Component({
  selector: 'app-workflow-project-detail',
  templateUrl: './workflow-project-detail.component.html',
  styleUrls: ['./workflow-project-detail.component.scss']
})
export class WorkflowProjectDetailComponent implements OnInit {

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  
  selectedProject: ProjectInfo={id:'',name:''}
  projects: ProjectInfo[] = [];
  projectCollection: Project[] = [];
  dataSource:ProjectDetailInfo[]=[];
  displayedColumns = ['name', 'value'];
  displayedTasks: string[] = ['activity', 'task', 'duration', 'approver'];
  taskSource = new MatTableDataSource<Task>();
  taskData: Task[] = [];

  private _selectedProjectItem:ProjectInfo
  
  private get selectedProjectItem() : ProjectInfo {
    return this._selectedProjectItem;
  }

  private set selectedProjectItem(value:ProjectInfo)
  {
    this._selectedProjectItem = value;
    this.selectedProject = value;
    this.onProjectChange();
  }
  
  constructor(private workflowProjectDetailService:WorkflowProjectDetailService, public datepipe: DatePipe ) { }

  onProjectChange()
  {
    console.log(this.selectedProject);
    
    this.fetchProjectDetails()
    this.fetchTaskData();
  }

  ngOnInit() {
    this.fetchProjects();
  }

  ngAfterViewInit() {
    this.taskSource.paginator = this.paginator.toArray()[1];
    this.taskSource.sort = this.sort.toArray()[1];
  }

  fetchProjects()
  {
    this.workflowProjectDetailService.fetchProjects().subscribe(x=>{   
      x.forEach(x=>this.projectCollection.push(x)); 
      x.forEach(x=>this.projects.push({id:x.projectId,name:x.name}))    
    })
  }

  fetchProjectDetails()
  {
    console.log(this.selectedProject.id)
    this.dataSource = [];
    let selectedData = this.projectCollection.filter(x=>x.projectId == this.selectedProjectItem.id)[0];
    this.dataSource.push({name:'Project Name',value:selectedData.name});
    this.dataSource.push({name:'Engagement',value:selectedData.areaOfEngagement});
    this.dataSource.push({name:'Budget',value:selectedData.budget.toString()});
    this.dataSource.push({name:'Corporate Entity',value:selectedData.corporate});
    this.dataSource.push({name:'Location',value:selectedData.location});
    this.dataSource.push({name:'Point Of Contact',value:selectedData.pointOfContactUserList!=undefined?selectedData.pointOfContactUserList[0].name:''});
    this.dataSource.push({name:'Stakeholder',value:selectedData.stakeholderList!=undefined?selectedData.stakeholderList[0].name:''});
    this.dataSource.push({name:'Summary',value:selectedData.summary});
    this.dataSource.push({name:'Status',value:selectedData.status});
    this.dataSource.push({name:'Rating',value:selectedData.rating.toString()});
    this.dataSource.push({name:'Created By',value:selectedData.createdBy});
    this.dataSource.push({name:'Created On',value:this.datepipe.transform(selectedData.createdOn, 'dd MMM yyyy')});
    this.dataSource.push({name:'Updated By',value:selectedData.updatedBy});
    this.dataSource.push({name:'Updated On',value:this.datepipe.transform(selectedData.updatedOn, 'dd MMM yyyy')});
}

fetchTaskData(){
  this.taskData = [];
  console.log(this.selectedProjectItem.id);
  
  this.workflowProjectDetailService.fetchProjectTasks(this.selectedProjectItem.id).subscribe(x=>{ 
    x.forEach(x=>this.taskData.push(x))  
    console.log(JSON.stringify(this.taskData));    
    this.taskSource = new MatTableDataSource<Task>(this.taskData);    
  })
}

}
