
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';


export interface PointOfContacts {
  name: string;
  phoneNo: number;
  emailId: string;
  role: string;
}

export interface Stakeholders {
  name: string;
  phoneNo: number;
  emailId: string;
  role: string;
}

export interface Projects {
  projectId: string;
  name: string;
  areaOfEngagement: string;
  associatedCorporateEntity: string;
  budget: number;
  status: string;
  endDate: Date;
  startDate: Date;
  location: string;
  pointOfContacts: PointOfContacts[];
  stakeholders: Stakeholders[];
  summary: string;

}

export interface Volunteers {
  name: string;
  emailId: string;
  phoneNo: number;
  role: string;
}

export interface Approver {
  name: string;
  emailId: string;
  phoneNo: number;
  role: string;
}

export interface Tasks {
  activityLabel: string;
  taskId: string;
  name: string;
  description: string;
  projectId: string;
  startDate: Date;
  endDate: Date;
  location: string;
  approver: Approver;
  volunteers: Volunteers[];
  createdBy: string;
  createdTime: Date;
  updatedBy: string;
  updatedTime: Date;
}

export interface ProjectStatus {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  

  displayedTasks: string[] = ['activity', 'area', 'task', 'duration', 'approver', 'approver_comments', 'volunteer', 'volunteer_comments', 'uploads', 'time_estimated', 'audit_timestamp', 'status', 'edit'];
  projectStatus: ProjectStatus[] = [
    { value: 'InProgress', viewValue: 'InProgress' },
    { value: 'OnHold', viewValue: 'OnHold' },
    { value: 'Closed', viewValue: 'Closed' }
  ];

  taskSource = new MatTableDataSource<Tasks>();
  isLoaded: boolean = false;
  isLoaded1: boolean = false;
  isTaskLoaded: boolean = false;
  isSpinnerEnabled: boolean = false;
  isSummary: boolean = false;
  taskData: Tasks[] = [];
  volunteer: Volunteers[] = [];
  pointOfContacts: PointOfContacts[] = [];
  stakeholders: Stakeholders[] = [];
  summary: string;
  taskDetails: Tasks;
  isProject: boolean = false;
  isImage: boolean = false;
  statusToUpdate: string;
  projectDetails: Projects;
  image: string = "./../../../assets/angularLogo.svg";
  selectedFile: File = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  // @ViewChildren(MatSort) sort = new QueryList<MatSort>();


  constructor(private httpService: HttpClient, private router: Router, private httpClient: HttpClient) {

  }
  arrJson: any = [];
  taskJson: any = [];
  keys: any = [];
  ngOnInit() {


    this.showDetails("volunteer");
    this.taskSource.paginator = this.paginator;
    this.taskSource.sort = this.sort;

  }

  ngAfterViewInit() {
    this.taskSource.paginator = this.paginator;
    this.taskSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.taskSource.filter = filterValue.trim().toLowerCase();
    this.taskSource.filter = filterValue;
   
  }

  onFileSelected(event)
  {
    this.selectedFile = event.target.files[0];

  }
  onUpload()
  {
    const fd = new FormData();
    fd.append('image',this.selectedFile,this.taskDetails.taskId);
   
    this.httpClient.post('someurl',fd).subscribe(
      res => {
        
      }
    )

  }




  showDetails(temp) {
    this.isImage = false;
    this.isSummary = false;
    this.isTaskLoaded = false;
    this.isLoaded = false;
    this.isSpinnerEnabled = true;
    let id = temp.projectId;

    let url = 'http://localhost:8080/project/tasks?pid=5d80e02e1c9d44000001d863';

    this.taskData = [];
    this.httpService.get(url).subscribe(
      data => {

        this.taskJson = data;
        for (let i = 0; i < this.taskJson.length; i++) {

          this.taskData[i] = this.taskJson[i];

          this.taskDetails = this.taskData[i];
        }


        this.isLoaded = true;
        this.isSpinnerEnabled = false;
        this.taskSource = new MatTableDataSource<Tasks>(this.taskData);


        this.isProject = true;
        this.ngAfterViewInit();

      },
      (err: HttpErrorResponse) => {
        
      }
    );
  }

  showTaskDetails(temp) {
    
    let url = 'http://localhost:8080/project/get?pid=' + temp.projectId;
    this.httpService.get(url).subscribe(
      data => {
        this.isTaskLoaded = true;
        this.arrJson = data;
        this.projectDetails = this.arrJson;
        this.taskDetails = temp;
        this.volunteer = temp.volunteers;
        this.pointOfContacts = this.projectDetails.pointOfContacts;
        this.stakeholders = this.projectDetails.stakeholders;
        this.summary = this.projectDetails.summary;
        this.isLoaded = false;
      }
    );

  }
  hideTaskDetails() {
    this.isTaskLoaded = false;
    this.isLoaded = true;
  }

  public doFilter = (value: string) => {
    this.taskSource.filter = value.trim().toLocaleLowerCase();
  }

  showSummary() {
    this.isSummary = true;
  }

  showImage() {
    this.isImage = true;
  }
  hideImage() {
    this.isImage = false;
  }



  editTask(temp) {
    console.log(temp);
    localStorage.setItem("currentTask", JSON.stringify(temp));
    //this.taskDetails = JSON.parse(localStorage.getItem('currentTask'));
    this.router.navigate(['../taskEdit']);
  }

  deleteTask(temp) {
    this.taskSource.data = this.taskSource.data.filter((task: Tasks) => {
      return task.taskId != temp.taskId;
    })
    let url = 'http://localhost:8080/project/deleteTask?tid=' + temp.taskId;

    this.httpService.delete(url, temp.taskId).subscribe(
      data => {

      }

    );
  }

}
