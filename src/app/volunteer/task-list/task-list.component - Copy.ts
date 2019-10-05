
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ProjectServiceService } from 'src/app/project/_service/project-service.service';
import { AddTaskComponent } from 'src/app/dialogs/add-task/add-task.component';


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
  corporate: string;
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
  

  constructor(private httpService: HttpClient, private router: Router, private httpClient: HttpClient,public dialog: MatDialog,public dataService: DataService,private _projectService: ProjectServiceService) {

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

    let url = 'http://localhost:8080/task/tasks?pid=5d7f8af91c9d44000096629e';

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
    // this.router.navigate(['../taskEdit']);
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data: temp
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
         //const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.projectId === element.projectId);
        // Then you update that record using data from dialogData (values you enetered)
         //this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
      
    });
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

  
  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
   // this.fetchTask();
  }
  // fetchProjects() {
  //   this.isLoaded1 = false;
  //   this.isLoaded = false;
  //   this.isTaskLoaded = false;
  //   this.isSpinnerEnabled = false;
  //   this.isSummary = false;
  //   this.tableData = [];
  //   this.httpService.get('http://localhost:8080/project/all').subscribe(
  //     data => {
  //       this.arrJson = data;
  //       this.tableData.push(this.arrJson);
  //       for (let i = 0; i < this.arrJson.length; i++) {
  //         this.tableData[i] = this.arrJson[i];
  //       }

  //       this.isLoaded1 = true;
  //       this.dataSource = new MatTableDataSource<Projects>(this.tableData);

  //       this.ngAfterViewInit();
  //       console.log(this.arrJson.length);
  //       // console.log(this.tableData);
  //       this.projectDetails = this.tableData[0];
  //       console.log(this.tableData[0].budget);
  //     },
  //     (err: HttpErrorResponse) => {
  //       console.log();
  //     }
  //   );

  // }

}
