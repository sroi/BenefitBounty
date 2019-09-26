
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

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


  displayedTasks: string[] = ['activity', 'task', 'duration', 'approver'];
  projectStatus: ProjectStatus[] = [
    {value: 'InProgress', viewValue: 'InProgress'},
    {value: 'OnHold', viewValue: 'OnHold'},
    {value: 'Closed', viewValue: 'Closed'}
  ];

  taskSource = new MatTableDataSource<Tasks>();
  isLoaded: boolean = false;
  isLoaded1: boolean = false;
  isTaskLoaded: boolean = false;
  isSpinnerEnabled: boolean = false;
  isSummary: boolean = false;
  taskData: Tasks[] = [];
  volunteer: Volunteers[] = [];
  taskDetails: Tasks;
  isProject: boolean = false;
  isImage: boolean = false;
  statusToUpdate: string;
  image: string = "./../../../assets/angularLogo.svg";

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;

  // @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  // @ViewChildren(MatSort) sort = new QueryList<MatSort>();


  constructor(private httpService: HttpClient, private router: Router) {

  }
  arrJson: any = [];
  taskJson: any = [];
  keys: any = [];
  ngOnInit() {


    this.showDetails("volunteer");
        
  }

  ngAfterViewInit()
  {
    console.log("ngafter");
    this.taskSource.paginator = this.paginator;
    this.taskSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.taskSource.filter = filterValue.trim().toLowerCase();
    this.taskSource.filter = filterValue;
    console.log(filterValue);
  }


  

  showDetails(temp) {
    this.isImage = false;
    this.isSummary = false;
    this.isTaskLoaded = false;
    this.isLoaded = false;
    this.isSpinnerEnabled = true;
    let id = temp.projectId;
    console.log("showDetails loaded");

    let url = 'http://localhost:8080/project/tasks?pid=5d7f8af91c9d44000096629e';
  
    this.taskData = [];
    this.httpService.get(url).subscribe(
      data => {

        this.taskJson = data;
        console.log(this.taskJson);
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
        console.log();
      }
    );
  }

  showTaskDetails(temp) {
    console.log(temp);
    this.taskDetails = temp;
    this.volunteer = temp.volunteers;
    this.isTaskLoaded = true;
    this.isLoaded = false;
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
    this.router.navigate(['./add']);
  }

  deleteTask(temp) {
    console.log(temp);
    this.taskSource.data = this.taskSource.data.filter((task: Tasks)=>{
      return task.taskId !=temp.taskId;
    })
    let url = 'http://localhost:8080/project/deleteTask?tid=' + temp.taskId;

    this.httpService.delete(url, temp.taskId).subscribe(
      data => {

      }

    );
  }

}
