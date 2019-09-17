import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

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
  endDate: Date;
  startDate: Date;
  location: string;
  pointOfContacts: PointOfContacts[];
  stakeholders: Stakeholders[];
  summary: string;
}

export interface Volunteers{
  name: string;
  emailId: string;
  phoneNo: number;
  role: string;
}

export interface Approver{
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


export interface TaskElement {
  activity: string;
  task: string;
  duration: number;
  approver: string;
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {


  displayedColumns: string[] = ['area', 'name', 'budget', 'location', 'duration', 'edit', 'delete'];
  displayedTasks: string[] = ['activity', 'task', 'duration', 'approver', 'edit', 'delete'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // taskSource = new MatTableDataSource<TaskElement>(taskData);
  dataSource = new MatTableDataSource<Projects>();
  taskSource = new MatTableDataSource<Tasks>();
  isLoaded: boolean = false;
  isLoaded1: boolean = false;
  isSpinnerEnabled: boolean = false;
  taskData1: TaskElement[];
  taskData: Tasks[] = [];
  projectDetails: Projects;
  isProject: boolean = false;
  // tableData: PeriodicElement[];
  tableData: Projects[] = [];
  // @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  // @ViewChild(MatSort,{static:true}) sort: MatSort;

  // @ViewChild(MatPaginator,{static:true}) paginator2: MatPaginator;
  // @ViewChild(MatSort,{static:true}) sort2: MatSort;

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();


  constructor(private httpService: HttpClient, private router: Router) {

  }
  arrJson: any = [];
  taskJson: any = [];
  keys: any = [];
  ngOnInit() {

    this.fetchProjects();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator.toArray()[0];
    this.dataSource.sort = this.sort.toArray()[0];
    this.taskSource.paginator = this.paginator.toArray()[1];
    this.taskSource.sort = this.sort.toArray()[1];
  }

  fetchProjects() {
    this.httpService.get('http://localhost:8080/project/all').subscribe(
      data => {
        this.arrJson = data;
        this.tableData.push(this.arrJson);
        for (let i = 0; i < this.arrJson.length; i++) {
          // this.tableData[i].projectId = this.arrJson[i].projectId;
          // this.tableData[i].name = this.arrJson[i].name;
          // this.tableData[i].areaOfEngagement = this.arrJson[i].areaOfEngagement;
          // this.tableData[i].associatedCorporateEntity = this.arrJson[i].associatedCorporateEntity;
          // this.tableData[i].budget = this.arrJson[i].budget;
          // this.tableData[i].endDate = this.arrJson[i].endDate;
          // this.tableData[i].startDate = this.arrJson[i].startDate;
          // this.tableData[i].location = this.arrJson[i].location;
          // this.tableData[i].pointOfContacts = this.arrJson[i].pointOfContacts;
          // this.tableData[i].stakeholders = this.arrJson[i].stakeholders;
          // this.tableData[i].summary = this.arrJson[i].summary;
          this.tableData[i] = this.arrJson[i];

        }

        this.isLoaded1 = true;
        // this.isSpinnerEnabled = false;
        this.dataSource = new MatTableDataSource<Projects>(this.tableData);

        this.ngAfterViewInit();
        console.log(this.arrJson.length);
        // console.log(this.tableData);
        this.projectDetails = this.tableData[0];
        console.log(this.tableData[0].budget);
      },
      (err: HttpErrorResponse) => {
        console.log();
      }
    );

  }

  showDetails(temp) {
    this.isLoaded = false;
    this.isSpinnerEnabled = true;
    let id = temp.projectId;
    
    let url = 'http://localhost:8080/project/tasks?pr_id='+id;
    this.projectDetails = temp;
    console.log(url);
    
    this.httpService.get(url).subscribe(
      data => {

        this.taskJson = data;
        console.log(this.taskJson);
        for (let i = 0; i < this.taskJson.length; i++) {

          this.taskData[i] = this.taskJson[i];
          console.log(this.taskData[i]);

        }


        this.isLoaded = true;
        this.isSpinnerEnabled = false;
        this.taskSource = new MatTableDataSource<Tasks>(this.taskData);

        this.projectDetails = temp;
        this.isProject = true;
      


        this.ngAfterViewInit();
        // console.log(this.taskJson.length);
        // // console.log(this.tableData);
        // console.log(this.taskData[0].name);
      },
      (err: HttpErrorResponse) => {
        console.log();
      }
    );
  }

  fetchProjects1() {
    // this.isLoaded1 = false;
    // this.isSpinnerEnabled = true;

    // setTimeout(() => {
    //   this.tableData = [
    //     { area: "Goregaon", name: 'Utkarsh', duration: 1.0079, status: 'active' },
    //     { area: "Goregaon", name: 'NGO', duration: 4.0026, status: 'active' },
    //     { area: "Malad", name: 'NGO2', duration: 6.941, status: 'active' },
    //     { area: "Malad", name: 'Utkarsh2', duration: 9.0122, status: 'active' },
    //     { area: "Goregaon", name: 'NGO3', duration: 10.811, status: 'Inactive' },
    //     { area: "Goregaon", name: 'NGO5', duration: 12.0107, status: 'Inactive' },
    //     { area: "Malad", name: 'NGO4', duration: 14.0067, status: 'Inactive' },
    //     { area: "Malad", name: 'Utkarsh3', duration: 15.9994, status: 'active' },
    //     { area: "Andheri", name: 'NGO7', duration: 18.9984, status: 'Inactive' },
    //     { area: "Goregaon", name: 'NGO9', duration: 20.1797, status: 'Inactive' },
    //     { area: "Andheri", name: 'Utkarsh4', duration: 1.0079, status: 'active' },
    //     { area: "Andheri", name: 'Utkarsh5', duration: 4.0026, status: 'Inactive' },
    //     { area: "Malad", name: 'NGO10', duration: 6.941, status: 'Inactive' },
    //     { area: "Malad", name: 'Utkarsh6', duration: 9.0122, status: 'Inactive' },
    //     { area: "Malad", name: 'NGO11', duration: 10.811, status: 'Inactive' },
    //   ];

    //   this.isLoaded1 = true;
    //   // this.isSpinnerEnabled = false;
    //   this.dataSource = new MatTableDataSource<PeriodicElement>(this.tableData);

    //   this.ngAfterViewInit();
    //   //this.taskSource = this.taskSource1;
    //   // document.getElementById("projectDetails").hidden = false;

    // }, 1000);
  }


  showDetails1(temp) {
    console.log(temp.projectId);
    this.isLoaded = false;
    this.isSpinnerEnabled = true;
    //http://localhost:8080/project/tasks?pr_id=5d7f8af91c9d44000096629e
    setTimeout(() => {
      this.taskData1 = [
        { activity: "Identification", task: "Formation", duration: 12, approver: "NoOne" },
        { activity: "Deployment", task: "Formation", duration: 12, approver: "NoOne" },
        { activity: "Planning", task: "Formation", duration: 12, approver: "NoOne" },
        { activity: "Identification", task: "Formation", duration: 12, approver: "NoOne" },
        { activity: "Deployment", task: "Formation", duration: 12, approver: "NoOne" },
        { activity: "Planning", task: "Formation", duration: 12, approver: "NoOne" },
        { activity: "Identification", task: "Formation", duration: 12, approver: "NoOne" },
        { activity: "Deployment", task: "Formation", duration: 12, approver: "NoOne" },
      ];
      this.isLoaded = true;
      this.isSpinnerEnabled = false;
      //this.taskSource = new MatTableDataSource<TaskElement>(this.taskData1);
      this.projectDetails = temp;
      this.isProject = true;
      console.log(this.projectDetails);

      this.ngAfterViewInit();
      //this.taskSource = this.taskSource1;
      // document.getElementById("projectDetails").hidden = false;

    }, 1000);

  }

  hideDetails() {
    document.getElementById("projectDetails").hidden = true;
  }

  editProject(temp) {
    console.log(temp);
    this.router.navigate(['./add']);
  }

  deleteProject(temp) {
    console.log(this.dataSource.data);
    console.log(temp);
    // const index = this.dataSource.data.indexOf(temp);
    // this.dataSource.data.splice(index,1);
    // console.log(this.dataSource.data);
    this.router.navigate(['./add']);
  }

  editTask(temp) {
    console.log(temp);
    this.router.navigate(['./add']);
  }

  deleteTask(temp) {
    console.log(temp);
    this.router.navigate(['./add']);
  }

}
