/* #region Import */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ProjectServiceService } from '../_service/project-service.service';
import { Project } from '../_model';
import { SelectionModel } from '@angular/cdk/collections';
import { DataService } from 'src/app/services/data.service';
import { EditDialogComponent } from 'src/app/dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from 'src/app/dialogs/delete/delete.dialog.component';
import { Issue } from 'src/app/models/issue';
import { PhotoComponent } from 'src/app/shared/photo/photo.component';
import { element } from 'protractor';
import { EditTaskComponent } from 'src/app/dialogs/edit-task/edit-task.component';
import { DeleteTaskComponent } from 'src/app/dialogs/delete-task/delete-task.component';
import { CommentComponent } from 'src/app/dialogs/comment/comment.component';
import { ContactPersons } from '../_model/contact-persons';
import { AddTaskComponent } from 'src/app/dialogs/add-task/add-task.component';
import { Task } from '../_model/task';
import { AddDialogComponent } from 'src/app/dialogs/add/add.dialog.component';

//https://github.com/marinantonio/angular-mat-table-crud

/* #endregion */

/* #region Interface */
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
  pointOfContacts: PointOfContacts;
  stakeholders: Stakeholders;
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

export interface Comment {
  userId: string;
  comment: string;
  projectId: string;
}
/* #endregion */


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

/* #region Variables */
  displayedColumns: string[] = ['areaOfEngagement', 'name', 'budget','status', 'location', 'duration','changeStatus', 'actions'];
  displayedTasks: string[] = ['activity', 'task', 'duration', 'approver', 'actions'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // taskSource = new MatTableDataSource<TaskElement>(taskData);

  projectStatus: ProjectStatus[] = [
    {value: 'InProgress', viewValue: 'InProgress'},
    {value: 'On Hold', viewValue: 'On Hold'},
    {value: 'Closed', viewValue: 'Closed'},
    {value: 'Created', viewValue: 'Created'}
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
  isApprover: boolean;
  isVolunteer: boolean;
  isStakeholder: boolean;
  isPOC: boolean;
  exampleDatabase: DataService | null;
  images: any[]=[{name:'photo1', url:'https://d3dqioy2sca31t.cloudfront.net/Projects/cms/production/000/024/113/slideshow/2fb751a9d79c2bef5963210204348238/austria-hallstatt-daytime-mountains.jpg'},
  {name:'photo1', url:'https://st2.depositphotos.com/1004221/8723/i/950/depositphotos_87237724-stock-photo-hallstatt-mountain-village-alps-austria.jpg'},
  {name:'photo1', url:'https://travelpassionate.com/wp-content/uploads/2019/04/Scenic-view-of-famous-Hallstatt-village-in-the-Austrian-Alps.-Image-min.jpg'},
  {name:'photo1', url:'https://www.travelshelper.com/wp-content/uploads/2017/07/AUSTRIA-TRAVEL-GUIDE-Travel-S-Helper-800x600.jpg'},
  {name:'photo1', url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXVUCXTNgcJrfF7VluwC-GxtTqSgIbn7Vh6x9cedft9rOgxJfN'}];
  // tableData: PeriodicElement[];
  tableData: Projects[] = [];
  project: Project;
  dataToSend: Comment;
  addProject:Project;
  addTasks:Tasks;
  /* #endregion */

  // @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  // @ViewChild(MatSort,{static:true}) sort: MatSort;

  // @ViewChild(MatPaginator,{static:true}) paginator2: MatPaginator;
  // @ViewChild(MatSort,{static:true}) sort2: MatSort;

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();


  constructor(private httpService: HttpClient, private router: Router, private _projectService: ProjectServiceService,public dialog: MatDialog,public dataService: DataService) {

  }
  arrJson: any = [];
  taskJson: any = [];
  keys: any = [];
  index: number;
  id: number;
  i: number = 10;
  selection = new SelectionModel<Projects>(true, []);
  row: Issue = {id: 12,
    title: "testing",
    state: "Maharashtra",
    url: "someurl",
    created_at: "pune",
    updated_at: "mumbai"};
   
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

  // startEdit(i: number, id: number, title: string, state: string, url: string, created_at: string, updated_at: string) {
  //   this.id = id;
  //   // index row is used just for debugging proposes and can be removed
  //   this.index = i;
  //   console.log(this.index);
  //   const dialogRef = this.dialog.open(EditDialogComponent, {
  //     data: {id: id, title: title, state: state, url: url, created_at: created_at, updated_at: updated_at}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 1) {
  //       // When using an edit things are little different, firstly we find record inside DataService by id
  //       const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
  //       // Then you update that record using data from dialogData (values you enetered)
  //       this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
  //       // And lastly refresh table
  //       this.refreshTable();
  //     }
  //   });
  // }

  // export interface Projects {
  //   projectId: string;
  //   name: string;
  //   areaOfEngagement: string;
  //   associatedCorporateEntity: string;
  //   budget: number;
  //   status: string;
  //   endDate: Date;
  //   startDate: Date;
  //   location: string;
  //   pointOfContacts: PointOfContacts[];
  //   stakeholders: Stakeholders[];
  //   summary: string;
  
  // }

  projectEdit(element: Projects)
  {
    console.log(element);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {projectId:element.projectId, name: element.name, areaOfEngagement: element.areaOfEngagement, corporate: element.corporate, budget: element.budget, status: element.status,
         startDate: element.startDate,endDate: element.endDate,location: element.location,stakeholders:element.stakeholders,
        pointOfContacts: element.pointOfContacts,summary:element.summary}
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

  projectComment(element: Projects)
  {
    //console.log(element);
    this.dataToSend = {userId: '123', comment:'',projectId:'345'};
    const dialogRef = this.dialog.open(CommentComponent, {
      data: this.dataToSend
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
         //const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.projectId === element.projectId);
        // Then you update that record using data from dialogData (values you enetered)
         //this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
       // this.refreshTable();
      }
      
    });

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
        this.refreshTable();
      }
      
    });

  }


  taskAdd()
  {
    this.addTasks= new Task();
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data: this.addTasks
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



  projectDelete(element:Projects) {
      
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: {projectId:element.projectId, name: element.name, areaOfEngagement: element.areaOfEngagement, corporate: element.corporate, budget: element.budget, status: element.status,
          startDate: element.startDate,endDate: element.endDate,location: element.location,stakeholders:element.stakeholders,
         pointOfContacts: element.pointOfContacts,summary:element.summary}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
           //const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
          // for delete we use splice in order to remove single object from DataService
            //this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
          this.refreshTable();
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
          this.refreshTable();
        }
        
      });
    }

  // deleteItem(i: number, id: number, title: string, state: string, url: string) {
  //   this.index = i;
  //   this.id = id;
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     data: {id: id, title: title, state: state, url: url}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 1) {
  //       const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
  //       // for delete we use splice in order to remove single object from DataService
  //       this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
  //       this.refreshTable();
  //     }
  //   });
  // }


  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.fetchProjects();
  }

  customFilterPredicate() 
  {
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

  fetchProjects()
   {
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
  updateTask(element)
  {


  }
  openImage(image:any)
  {
    const dialogRef = this.dialog.open(PhotoComponent, {
      data: image
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  
  showDetails(temp) {
    this.isStakeholder = true;
    this.isPOC = true;
    this.isImage = false;
    this.isSummary = false;
    this.isTaskLoaded = false;
    this.isLoaded = false;
    this.isSpinnerEnabled = true;
    let id = temp.projectId;
    this.currentProject = temp;
    if(temp.stakeholders==null)
    {
      this.isStakeholder = false;
    }
    if(temp.pointOfContacts==null)
    {
      this.isPOC = false;
    }
    console.log(temp);

    let url = 'http://localhost:8080/task/tasks?pid=' + id;
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

  hideDetails() {
    document.getElementById("projectDetails").hidden = true;
    this.isLoaded = false;
    this.isProject = false;
    this.isTaskLoaded = false;
  }

  

  showTaskDetails(temp) {
    this.taskDetails = temp;
    this.volunteer = temp.volunteers;
    this.isApprover = true;
    this.isVolunteer = true;
    if(temp.approver==null)
    {
      this.isApprover = false;
    }
    if(temp.volunteer==null)
    {
      this.isVolunteer = false;
    }
    console.log("volunteer new");
    console.log(this.volunteer);
    this.isTaskLoaded = true;
    console.log(this.isTaskLoaded);
    // this.isLoaded = false;
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

  

  editProject(temp) {
    localStorage.setItem("currentProject",temp.name);
    this.router.navigate(['./add']);
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
    let url = 'http://localhost:8080/task/delete?tid=' + temp.taskId;

    this.httpService.delete(url, temp.taskId).subscribe(
      data => {

      }

    );
  }

  changeStatusValue(statusValue,element)
  {
    this.statusToUpdate = statusValue;
    this.projectComment(element);
    this.changeStatus(element,statusValue);
  }

  changeStatus(project,statusValue)
  {
    //console.log(project);
    //console.log(statusValue);

    let url = 'http://localhost:8080/project/updateStatus?pid=' + project.projectId + '&status=' + statusValue;

    this.httpService.post(url, project.projectId, statusValue).subscribe(
      data => {
        //console.log(data);
        //this.refreshTable();
      }

    );
  }

  refresh() {
    window.location.reload();
  }
  
  
  projectAdd()
  { this.addProject=new Project();
    this.addProject.stakeHolders= new ContactPersons();
    this.addProject.pointOfContact= new ContactPersons();
    const _addproject=this.addProject;
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: _addproject
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
  

}