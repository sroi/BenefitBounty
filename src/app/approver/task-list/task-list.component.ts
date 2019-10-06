
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { EditTaskComponent } from 'src/app/dialogs/edit-task/edit-task.component';
import { DeleteTaskComponent } from 'src/app/dialogs/delete-task/delete-task.component';
 
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
  approver: string; 
  createdBy: string;
  createdOn: Date;
  updatedBy: string;
  updatedOn: Date;
}


export interface Activity {
  activityId: object;
  projectId: string;
  taskId: string;
  userId: string;
  role: string;
  activity: string;
  comments: string;
  uploads: string;
  timeEntered: string; 
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
export class TaskList1Component implements OnInit {


  displayedTasks: string[] = ['activity', 'task', 'duration', 'approver'];
  
  displayedActivity: string[] = ['userId','activity','comments','uploads','timeEntered','updatedOn'];
  projectStatus: ProjectStatus[] = [
    {value: 'InProgress', viewValue: 'InProgress'},
    {value: 'OnHold', viewValue: 'OnHold'},
    {value: 'Closed', viewValue: 'Closed'}
  ];

  taskSource = new MatTableDataSource<Tasks>();
  activitySource = new MatTableDataSource<Activity>();
  isLoaded: boolean = false;
  isLoaded1: boolean = false;
  isTaskLoaded: boolean = false;
  isSpinnerEnabled: boolean = false;
  isSummary: boolean = false;
  taskData: Tasks[] = []; 
  activityData: Activity[] = []; 
  taskDetails: Tasks;
  isProject: boolean = false;
  isImage: boolean = false;
  statusToUpdate: string;
  image: string = "./../../../assets/angularLogo.svg";

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;

  // @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  // @ViewChildren(MatSort) sort = new QueryList<MatSort>();


  constructor(private httpService: HttpClient, private router: Router,public dialog: MatDialog) {

  }
  arrJson: any = [];
  taskJson: any = [];
  activityJson :any= [];
  keys: any = [];
  ngOnInit() {


    this.showDetails("volunteer");
        
  }

  ngAfterViewInit()
  {
    console.log("ngafter");
    this.taskSource.paginator = this.paginator;
    this.taskSource.sort = this.sort;
    this.activitySource.paginator = this.paginator; 
    this.activitySource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.taskSource.filter = filterValue.trim().toLowerCase();
    this.taskSource.filter = filterValue;
    this.activitySource.filter = filterValue.trim().toLowerCase();
    this.activitySource.filter = filterValue;
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

    let url = 'http://localhost:8080/task/approver?approver=5d910f8bce6b381f8452b48e'; 
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
        console.log("taskSource recieved "+this.taskSource);
     
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
    this.isTaskLoaded = true;
    this.isLoaded = true;
    this.isLoaded1 = true;
  }

  // showTaskDetails(temp) {
  //   this.taskDetails = temp;
  //   this.volunteer = temp.volunteers;
  //   this.isApprover = true;
  //   this.isVolunteer = true;
  //   if(temp.approver==null)
  //   {
  //     this.isApprover = false;
  //   }
  //   if(temp.volunteer==null)
  //   {
  //     this.isVolunteer = false;
  //   }
  //   console.log("volunteer new");
  //   console.log(this.volunteer);
  //   this.isTaskLoaded = true;
  //   console.log(this.isTaskLoaded);
  //   // this.isLoaded = false;
  // }

  //lalit Starts
  showActivityDetails(temp) {
    this.isImage = false;
    this.isSummary = false;
    this.isTaskLoaded = false;
    this.isLoaded = false;
    this.isSpinnerEnabled = true;
    let id = temp.projectId;
    console.log("showDetails loaded"+temp.taskId);
 
    let url = 'http://localhost:8080/task/activity?taskId='+temp.taskId; 
    this.activityData = [];
    this.httpService.get(url).subscribe(
      data => {

        this.activityJson = data;
        console.log(this.activityJson);
        console.log("activity recieved "+this.activityJson.length);
        for (let i = 0; i < this.activityJson.length; i++) {

          this.activityData[i] = this.activityJson[i];
          
         // this.taskDetails = this.activityData[i];
        }


        this.isLoaded = true;
        this.isLoaded1 = true;
        this.isSpinnerEnabled = false;
        this.activitySource = new MatTableDataSource<Activity>(this.activityData);
    
        console.log("activitySource recieved "+this.activitySource);
        this.isProject = true;
        this.ngAfterViewInit();

      },
      (err: HttpErrorResponse) => {
        console.log();
      }
    );
  }

  taskEdit(element:Tasks)
  {
    console.log(element);
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
         //const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.projectId === element.projectId);
        // Then you update that record using data from dialogData (values you enetered)
         //this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.showDetails("volunteer");
      }
      
    });

  }
  taskDelete(element: Tasks) {
      
    const dialogRef = this.dialog.open(DeleteTaskComponent, {
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
         //const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
          //this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.showDetails("volunteer");
      }
      
    });
  }
  
  //lalit end
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
