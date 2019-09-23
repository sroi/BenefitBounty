import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ProjectServiceService } from '../_service/project-service.service';
import { Project } from '../_model';
import { SelectionModel } from '@angular/cdk/collections';

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


export interface TaskElement {
  activity: string;
  task: string;
  duration: number;
  approver: string;
}
export interface ProjectStatus {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {


  displayedColumns: string[] = ['areaOfEngagement', 'name', 'budget','status', 'location', 'duration','changeStatus', 'edit', 'delete'];
  displayedTasks: string[] = ['activity', 'task', 'duration', 'approver', 'view', 'edit', 'delete'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // taskSource = new MatTableDataSource<TaskElement>(taskData);

  projectStatus: ProjectStatus[] = [
    {value: 'InProgress', viewValue: 'InProgress'},
    {value: 'OnHold', viewValue: 'OnHold'},
    {value: 'Closed', viewValue: 'Closed'}
  ];

  areaFilter = new FormControl();
  nameFilter = new FormControl();
  budgetFilter = new FormControl();
  locationFilter = new FormControl();

  filteredValues = { areaOfEngagement: '', name: '', budget: '', location: '', duration: '' };

  dataSource = new MatTableDataSource<Projects>();
  taskSource = new MatTableDataSource<Tasks>();
  isLoaded: boolean = false;
  isLoaded1: boolean = false;
  isTaskLoaded: boolean = false;
  isSpinnerEnabled: boolean = false;
  isSummary: boolean = false;
  taskData1: TaskElement[];
  taskData: Tasks[] = [];
  projectDetails: Projects;
  currentProject: Projects;
  volunteer: Volunteers[] = [];
  taskDetails: Tasks;
  isProject: boolean = false;
  isImage: boolean = false;
  statusToUpdate: string;
  image: string = "./../../../assets/angularLogo.svg";
  // tableData: PeriodicElement[];
  tableData: Projects[] = [];
  project: Project;

  // @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  // @ViewChild(MatSort,{static:true}) sort: MatSort;

  // @ViewChild(MatPaginator,{static:true}) paginator2: MatPaginator;
  // @ViewChild(MatSort,{static:true}) sort2: MatSort;

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();


  constructor(private httpService: HttpClient, private router: Router, private _projectService: ProjectServiceService) {

  }
  arrJson: any = [];
  taskJson: any = [];
  keys: any = [];
  selection = new SelectionModel<Projects>(true, []);
  ngOnInit() {


    this.fetchProjects();

    this.areaFilter.valueChanges.subscribe((areaFilterValue) => {
      this.filteredValues['areaOfEngagement'] = areaFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
      this.filteredValues['name'] = nameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.locationFilter.valueChanges.subscribe((locationFilterValue) => {
      this.filteredValues['location'] = locationFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.budgetFilter.valueChanges.subscribe((budgetFilterValue) => {
      this.filteredValues['budget'] = budgetFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();
    console.log(this.dataSource.filterPredicate)

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    console.log(filterValue);
  }

  customFilterPredicate() {
    const myFilterPredicate = function (data: Projects, filter: string): boolean {
      let searchString = JSON.parse(filter);
      return data.areaOfEngagement.toString().trim().indexOf(searchString.areaOfEngagement) !== -1 &&
        data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1 &&
        data.budget.toString().trim().toLowerCase().indexOf(searchString.budget.toLowerCase()) !== -1 &&
        data.location.toString().trim().toLowerCase().indexOf(searchString.location.toLowerCase()) !== -1;
    }
    console.log("gi");
    return myFilterPredicate;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator.toArray()[0];
    this.dataSource.sort = this.sort.toArray()[0];
    this.taskSource.paginator = this.paginator.toArray()[1];
    this.taskSource.sort = this.sort.toArray()[1];
  }

  fetchProjects() {
    this.isLoaded1 = false;
    this.isLoaded = false;
    this.isTaskLoaded = false;
    this.isSpinnerEnabled = false;
    this.isSummary = false;
    this.tableData = [];
    this.httpService.get('http://localhost:8080/project/all').subscribe(
      data => {
        this.arrJson = data;
        this.tableData.push(this.arrJson);
        for (let i = 0; i < this.arrJson.length; i++) {
          this.tableData[i] = this.arrJson[i];
        }

        this.isLoaded1 = true;
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
    this.isImage = false;
    this.isSummary = false;
    this.isTaskLoaded = false;
    this.isLoaded = false;
    this.isSpinnerEnabled = true;
    let id = temp.projectId;
    this.currentProject = temp;

    let url = 'http://localhost:8080/project/tasks?pid=' + id;
    this.projectDetails = temp;
    console.log(url);
    console.log(id);
    this.taskData = [];
    this.httpService.get(url).subscribe(
      data => {

        this.taskJson = data;
        console.log(this.taskJson);
        for (let i = 0; i < this.taskJson.length; i++) {

          this.taskData[i] = this.taskJson[i];
          console.log(this.taskData[i]);
          this.taskDetails = this.taskData[i];
        }


        this.isLoaded = true;
        this.isSpinnerEnabled = false;
        this.taskSource = new MatTableDataSource<Tasks>(this.taskData);

        this.projectDetails = temp;
        this.isProject = true;




        this.ngAfterViewInit();
      },
      (err: HttpErrorResponse) => {
        console.log();
      }
    );
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

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
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
    this.router.navigate(['./add?id=' + temp.id]);
  }

  deleteProject(temp) {
    console.log(this.dataSource.data);
    console.log(temp);
    this.dataSource.data = this.dataSource.data.filter((project: Projects)=>{
      return project.projectId !=temp.projectId;
    })
    
    // let url = 'http://localhost:8080/project/delete?pid=' + temp.projectId;

    // this.httpService.delete(url, temp.projectId).subscribe(
    //   data => {
    //     console.log(data);
    //   }

    // );
    
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

  changeStatusValue(statusValue)
  {
    this.statusToUpdate = statusValue;
  }

  changeStatus(project,statusValue)
  {
    console.log(project);
    console.log(statusValue);

    let url = 'http://localhost:8080/project/updateStatus?pid=' + project.projectId + '&status=' + statusValue;

    this.httpService.post(url, statusValue).subscribe(
      data => {
        console.log(data);
      }

    );
    location.reload();
  }

  refresh() {
    window.location.reload();
  }

}
