import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/project/_model';
import { WorkflowProjectDetailService } from './services/workflow-project-detail.service';
import { DatePipe } from '@angular/common'
import { ProjectDetailInfo } from '../models/project-detail';

@Component({
  selector: 'app-workflow-project-detail',
  templateUrl: './workflow-project-detail.component.html',
  styleUrls: ['./workflow-project-detail.component.scss']
})
export class WorkflowProjectDetailComponent implements OnInit {

  selectedProject: Project
  //projects: Project[] = [];
  projectCollection: Project[] = [];
  dataSource:ProjectDetailInfo[]=[];
  displayedColumns = ['name', 'value'];

  private _selectedProjectItem:Project
  
  private get selectedProjectItem() : Project {
    return this._selectedProjectItem;
  }

  private set selectedProjectItem(value:Project)
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
  }

  ngOnInit() {
    this.fetchProjects();
  }

  fetchProjects()
  {
    this.workflowProjectDetailService.fetchProjects().subscribe(x=>{   
      x.forEach(x=>this.projectCollection.push(x));     
    })
  }

  fetchProjectDetails()
  {
    this.dataSource = [];
    let selectedData = this.projectCollection.filter(x=>x.ProjectId == this.selectedProject.ProjectId)[0];
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
console.log(this.dataSource);



  }

}
