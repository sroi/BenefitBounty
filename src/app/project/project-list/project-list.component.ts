/* #region Import */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ProjectServiceService } from '../_service/project-service.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DataService } from 'src/app/services/data.service';
import { EditDialogComponent } from 'src/app/dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from 'src/app/dialogs/delete/delete.dialog.component';
import { Issue } from 'src/app/_models/issue';
import { PhotoComponent } from 'src/app/shared/photo/photo.component';
import { element } from 'protractor';
import { EditTaskComponent } from 'src/app/dialogs/edit-task/edit-task.component';
import { DeleteTaskComponent } from 'src/app/dialogs/delete-task/delete-task.component';
import { CommentComponent } from 'src/app/dialogs/comment/comment.component';
import { ContactPersons } from '../_model/contact-persons';
import { AddTaskComponent } from 'src/app/dialogs/add-task/add-task.component';

import { AddDialogComponent } from 'src/app/dialogs/add/add.dialog.component';
import { Task, image, Project, Message } from 'src/app/_models/model';
import { Task1 } from '../_model/task';
import { UserCommentsComponent } from 'src/app/dialogs/user-comments/user-comments.component';
import { ShowMessageComponent } from 'src/app/dialogs/show-message/show-message.component';

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
  startDate: String;
  location: string;
  pointOfContacts: PointOfContacts;
  stakeholders: Stakeholders;
  summary: string;

}

export interface Volunteers {
  _id: string;
  name: string;
  emailId: string;
  phoneNo: number;
  role: string;
}

export interface Approver {
  _id: string;
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
  status: string;
  role: string;
  rating: number;
  name: string;
}
/* #endregion */


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

/* #region Variables */
  displayedColumns: string[] = ['areaOfEngagement', 'name', 'budget','status', 'location', 'duration','rating','changeStatus', 'actions'];
  displayedTasks: string[] = ['activity', 'task', 'duration', 'approver', 'actions'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // taskSource = new MatTableDataSource<TaskElement>(taskData);

  projectStatus: ProjectStatus[] = [
    //{value: 'In Progress', viewValue: 'In Progress'},
    //{value: 'Approved', viewValue: 'Approved'},
    //{value: 'Rejected', viewValue: 'Rejected'},
    {value: 'On Hold', viewValue: 'On Hold'},
    {value: 'Closed', viewValue: 'Closed'}
    //{value: 'Created', viewValue: 'Created'}
  ];

  newProjectStatus: ProjectStatus[] = [];

  areaFilter = new FormControl();
  nameFilter = new FormControl();
  budgetFilter = new FormControl();
  locationFilter = new FormControl();

  filteredValues = { areaOfEngagement: '', name: '', budget: '', location: '', duration: '' };

  dataSource = new MatTableDataSource<Project>();
  taskSource = new MatTableDataSource<Task>();
  isLoaded: boolean = false;
  isLoaded1: boolean = false;
  isTaskLoaded: boolean = false;
  isSpinnerEnabled: boolean = false;
  isSummary: boolean = false;
  taskData1: TaskElement[];
  taskData: Task[] = [];
  projectDetails: Project;
  project: Project;
  currentProject: Project;
  volunteer: Volunteers[] = [];
  taskDetails: Task;
  isProject: boolean = false;
  isImage: boolean = false;
  statusToUpdate: string;
  isApprover: boolean;
  isVolunteer: boolean;
  isStakeholder: boolean;
  isPOC: boolean;
  hostname = "http://localhost:";
  portNo = "8080";
  taskApiUrl = this.hostname + this.portNo + "/task";
  exampleDatabase: DataService | null;
  imagesNew: image[] = [];
  excelFiles: image[] = [];
  wordFiles: image[] = [];
  txtFiles: image[] = [];
  pdfFiles: image[] = [];
  
  images: any[]=[{name:'photo1', url:'https://d3dqioy2sca31t.cloudfront.net/Projects/cms/production/000/024/113/slideshow/2fb751a9d79c2bef5963210204348238/austria-hallstatt-daytime-mountains.jpg'},
  {name:'photo1', url:'https://st2.depositphotos.com/1004221/8723/i/950/depositphotos_87237724-stock-photo-hallstatt-mountain-village-alps-austria.jpg'},
  {name:'photo1', url:'https://travelpassionate.com/wp-content/uploads/2019/04/Scenic-view-of-famous-Hallstatt-village-in-the-Austrian-Alps.-Image-min.jpg'},
  {name:'photo1', url:'https://www.travelshelper.com/wp-content/uploads/2017/07/AUSTRIA-TRAVEL-GUIDE-Travel-S-Helper-800x600.jpg'},
  {name:'photo1', url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXVUCXTNgcJrfF7VluwC-GxtTqSgIbn7Vh6x9cedft9rOgxJfN'}];
  // tableData: PeriodicElement[];
  tableData: Project[] = [];
  
  dataToSend: Comment;
  addProject:Project;
  addTasks:Task1;
  userId: string;
  role: string;
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
  selection = new SelectionModel<Project>(true, []);
  row: Issue = {id: 12,
    title: "testing",
    state: "Maharashtra",
    url: "someurl",
    created_at: "pune",
    updated_at: "mumbai"};
   
  ngOnInit() {

    // this.role = "admin";
    //this.userId = "sawannai@gmail.com";
    this.role = "Stakeholder";
    this.userId = "annahazare@gmail.com";
    
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

  

  projectEdit(element: Project)
  {
    console.log(element);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
         //const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.projectId === element.projectId);
        // Then you update that record using data from dialogData (values you enetered)
         //this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.showMessage("Project updated successfully");
        //this.refreshTable();
      }
      else {
        //this.refreshTable();
      }
      
    });

  }

  checkOptions(element) {
    if(element == 'On Hold'|| element == 'Closed')
    return true;
    return false;
  }

  projectComment(element: Project,status:string)
  {
    //console.log(element);
    this.dataToSend = {userId:this.userId, comment:'',projectId:element.projectId,status: status,role:'admin',rating:element.rating,name:element.name};
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
       this.refreshTable();
      }
      
    });

  }

  refreshData(){
    this.fetchProjects();
  }

  showComments() {
    const dialogRef = this.dialog.open(UserCommentsComponent, {
      data: this.taskDetails
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

taskEdit(element:Task)
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
        //this.refreshDetails();
        this.showMessage1("Task updated successfully");
      }
      else {
        //this.refreshDetails();
      }
      
    });

  }


  taskAdd()
  {
    
    this.addTasks= new Task1();
    console.log("taskAdd?() : "+ JSON.stringify(this.project))
    this.addTasks.projectId = this.project.projectId;
    console.log("taskAdd() :"+JSON.stringify(this.addTasks))
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
        this.showMessage1("Task added successfully");
        //this.refreshDetails();
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
          //this.refreshTable();
          this.showMessage("Project deleted successfully");
        }
        else
        {
          //this.refreshTable();
        }
        
      });
    }

    taskDelete(element: Task) {
      
      const dialogRef = this.dialog.open(DeleteTaskComponent, {
        data: element
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
           //const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
          // for delete we use splice in order to remove single object from DataService
            //this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
            this.showMessage1("Task deleted successfully");
          //this.refreshDetails();
        } 
        
      });
    }

    showMessage1(msg: string) {
      let message: Message = { message: msg };
      const dialogRef = this.dialog.open(ShowMessageComponent, {
        data: message
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          console.log("message displayed");
          this.refreshDetails();
        }
        else {
          this.refreshDetails();
        }
        
      });
    }

    showMessage(msg: string) {
      let message: Message = { message: msg };
      const dialogRef = this.dialog.open(ShowMessageComponent, {
        data: message
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result == 1) {
          console.log("message displayed");
          this.refreshTable();
        }
        else {
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

  refreshDetails()
  {
    this.showDetails(this.project);
  }

  customFilterPredicate() 
  {
    const myFilterPredicate = function (data: Project, filter: string): boolean {
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
    this.httpService.get('http://localhost:8080/project/all?user_id='+this.userId+'&Role='+this.role).subscribe(
      data => {
        this.arrJson = data;
        console.log(data);
        this.tableData.push(this.arrJson);
        for (let i = 0; i < this.arrJson.length; i++) {
          this.tableData[i] = this.arrJson[i];
        }

        this.isLoaded1 = true;
        this.dataSource = new MatTableDataSource<Project>(this.tableData);

        this.ngAfterViewInit();
        console.log(this.arrJson.length);
        // console.log(this.tableData);
        this.projectDetails = this.tableData[0];
        this.project = this.projectDetails;
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
    this.projectDetails = temp;
    this.project = this.projectDetails;
    if(temp.stakeholderList==null)
    {
      this.isStakeholder = false;
      this.project.stakeholder = this.project.stakeholderList[0];
    }
    if(temp.pointOfContact==null)
    {
      this.isPOC = false;
    }
    

    let url = 'http://localhost:8080/task/tasks?pid='+id;
    
    
    
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
        this.taskSource = new MatTableDataSource<Task>(this.taskData);

        this.projectDetails = temp;
        this.project = this.projectDetails;
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
    console.log(temp);
    let tid = temp.taskId;
    // localhost:8080/task/task?tid=5d9ad71f99097f28a943348c
    let url = `${this.taskApiUrl}/task?tid=${tid}`;
    this.httpService.get(url).subscribe(
      data => {
        this.taskJson = data;
        this.taskDetails = this.taskJson;
        if (this.taskDetails.approver_info != null)
          this.isApprover = true;
        if (this.taskDetails.vols_info != null)
          this.isVolunteer = true;
        this.isTaskLoaded = true;
        this.isLoaded = true;
        this.isLoaded1 = true;
        console.log(this.taskDetails);
        this.getImages(this.taskDetails);
      }
    );
    


  }

  downloadFile(file: image) {
    console.log(file.name);
    console.log(file.url);
    console.log("Download File");
    let link = document.createElement("a");
    link.download = file.name;
    link.name = file.name;
    link.type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    // link.type = "application/octet-stream";
    link.href = file.url;
    console.log(link);
    // link.click();
    window.open(link.href);
  }

  getImages(element)
  {
    this.imagesNew = [];
    console.log("getImages");
    this.httpService.get('http://localhost:8080/file/getByTask/'+element.taskId).subscribe(
      data => {
        console.log(data);
        this.arrJson = data;
        console.log(this.arrJson.length);
        var j = 0;
        var jTxt = 0;
        var jWord = 0;
        var jPdf = 0;
        for (let i = 0; i < this.arrJson.length; i++) {
          console.log(this.arrJson[i]);
          let newImage = {name: this.arrJson[i].fileName,url:'http://localhost:8080/file/display/'+this.arrJson[i].fileId+'/'+this.arrJson[i].fileName};
          if(newImage.name.indexOf('.xlsx')!=-1)
          {
            this.excelFiles[j] = newImage;
            j++;
            continue;
          }
          if(newImage.name.indexOf('.txt')!=-1)
          {
            this.txtFiles[jTxt] = newImage;
            jTxt++;
            continue;
          }
          if(newImage.name.indexOf('.docx')!=-1 || newImage.name.indexOf('.doc')!=-1)
          {
            this.wordFiles[jWord] = newImage;
            jWord++;
            continue;
          }
          if(newImage.name.indexOf('.pdf')!=-1)
          {
            this.pdfFiles[jPdf] = newImage;
            jPdf++;
            continue;
          }
          if(newImage.name.indexOf('.jpeg')!=-1 || newImage.name.indexOf('.jpg')!=-1 || newImage.name.indexOf('.png')!=-1)
          this.imagesNew[i] = newImage;
        }
      }
    );
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

  


  

  

  editProject(temp) {
    localStorage.setItem("currentProject",temp.name);
    this.router.navigate(['./add']);
  }

  deleteProject(temp) {
    console.log(this.dataSource.data);
    console.log(temp);
    this.dataSource.data = this.dataSource.data.filter((project: Project)=>{
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
    this.taskSource.data = this.taskSource.data.filter((task: Task)=>{
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
    this.projectComment(element,statusValue);
    //this.changeStatus(element,statusValue);
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
  { 
    const _addproject=this.addProject;
    const dialogRef = this.dialog.open(AddDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
         //const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.projectId === element.projectId);
        // Then you update that record using data from dialogData (values you enetered)
         //this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.showMessage("Project added successfully");
        //this.refreshTable();
      }
      
      
    });

  }
  

}