
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { EditTaskComponent } from 'src/app/dialogs/edit-task/edit-task.component';
import { DeleteTaskComponent } from 'src/app/dialogs/delete-task/delete-task.component';
import { DataService } from 'src/app/services/data.service';
import { PhotoComponent } from 'src/app/shared/photo/photo.component';
import { Task, Message, image } from 'src/app/_models/model';
import { ShowMessageComponent } from 'src/app/dialogs/show-message/show-message.component';
import { UserCommentsComponent } from 'src/app/dialogs/user-comments/user-comments.component';
import { ApproverCommentComponent } from 'src/app/dialogs/approver-comment/approver-comment.component';
 
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


  displayedTasks: string[] = ['project','activity', 'task', 'duration', 'status', 'actions'];
  
  displayedActivity: string[] = ['userId','activity','comments','uploads','timeEntered','updatedOn'];
  projectStatus: ProjectStatus[] = [
    {value: 'In Progress', viewValue: 'In Progress'},
    {value: 'On Hold', viewValue: 'On Hold'},
    {value: 'Closed', viewValue: 'Closed'}
  ];

  imagesNew: image[] = [];

  images: any[]=[{name:'photo1', url:'https://d3dqioy2sca31t.cloudfront.net/Projects/cms/production/000/024/113/slideshow/2fb751a9d79c2bef5963210204348238/austria-hallstatt-daytime-mountains.jpg'},
  {name:'photo1', url:'https://st2.depositphotos.com/1004221/8723/i/950/depositphotos_87237724-stock-photo-hallstatt-mountain-village-alps-austria.jpg'},
  {name:'photo1', url:'https://travelpassionate.com/wp-content/uploads/2019/04/Scenic-view-of-famous-Hallstatt-village-in-the-Austrian-Alps.-Image-min.jpg'},
  {name:'photo1', url:'https://www.travelshelper.com/wp-content/uploads/2017/07/AUSTRIA-TRAVEL-GUIDE-Travel-S-Helper-800x600.jpg'},
  {name:'photo1', url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXVUCXTNgcJrfF7VluwC-GxtTqSgIbn7Vh6x9cedft9rOgxJfN'}];

  hostname = "http://localhost:";
  portNo = "8080";
  taskApiUrl = this.hostname + this.portNo + "/task";
  taskSource = new MatTableDataSource<Task>();
  activitySource = new MatTableDataSource<Activity>();
  isLoaded: boolean = false;
  isLoaded1: boolean = false;
  isTaskLoaded: boolean = false;
  isSpinnerEnabled: boolean = false;
  isSummary: boolean = false;
  taskData: Task[] = []; 
  activityData: Activity[] = []; 
  taskDetails: Task;
  isProject: boolean = false;
  isImage: boolean = false;
  statusToUpdate: string;
  image: string = "./../../../assets/angularLogo.svg";
  userId: string;
  role: string;
  isApprover: boolean = false;
  isVolunteer: boolean = false;
  dataToSend: { userId: string; comment: string;name:string; taskId: string;status:string; };

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;

  // @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  // @ViewChildren(MatSort) sort = new QueryList<MatSort>();


  constructor(private httpService: HttpClient, private router: Router,public dialog: MatDialog, public dataService: DataService) {

  }
  arrJson: any = [];
  taskJson: any = [];
  activityJson :any= [];
  keys: any = [];
  ngOnInit() {


    this.role = "Approver";
    this.userId = "5d9984b61c9d440000d024be";
    this.showDetails(this.userId, this.role);
        
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


  

  showDetails(userId, role) {
    this.isProject = false;
    this.isImage = false;
    this.isImage = false;
    this.isSummary = false;
    this.isTaskLoaded = false;
    this.isLoaded = false;
    this.isSpinnerEnabled = true;
    console.log("showDetails loaded");

    let url = `${this.taskApiUrl}/fetch?uid=${userId}&role=${role}`;
    this.taskData = [];
    this.httpService.get(url).subscribe(
      data => {

        this.taskJson = data;
        console.log(this.taskJson);
        for (let i = 0; i < this.taskJson.length; i++) {

          this.taskData[i] = this.taskJson[i];

          this.taskDetails = this.taskData[i];
        }

        if (this.taskJson.length != 0)
          this.isLoaded = true;
        this.isSpinnerEnabled = false;
        this.taskSource = new MatTableDataSource<Task>(this.taskData);
        console.log("taskSource recieved " + this.taskSource);

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

  refreshData(){
    this.showDetails(this.userId,this.role);
  }

  changeTaskStatus(element:Task, status){
    var tid = element.taskId;
    var role = "Approver";
    this.approverComments(element,status);

    // var url = `http://localhost:8080/task/status?tid=${tid}&role=${role}&status=${status}`
    
    // this.httpService.put(url, 0).subscribe(() => {
    //   this.showDetails(this.userId,role);
    // })
  }

  approverComments(element,status) {
    this.dataToSend = { userId: this.userId, comment: '', name: element.name, taskId: element.taskId, status:status };
    const dialogRef = this.dialog.open(ApproverCommentComponent, {
      data: this.dataToSend
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 1) {
        
        this.showMessage("Your activity has been recorded successfully");
      }
    });
  }

  openImage(image:any)
  {
    const dialogRef = this.dialog.open(PhotoComponent, {
      data: image
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  showComments() {
    const dialogRef = this.dialog.open(UserCommentsComponent, {
      data: this.taskDetails
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  showMessage(msg: string) {
    let message: Message = { message: msg };
    const dialogRef = this.dialog.open(ShowMessageComponent, {
      data: message
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        
        this.showDetails(this.userId, this.role);
      }
      else
      {
        this.showDetails(this.userId,this.role);
      }
    });
  }
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
    this.taskSource.data = this.taskSource.data.filter((task: Task)=>{
      return task.taskId !=temp.taskId;
    })
    let url = 'http://localhost:8080/project/deleteTask?tid=' + temp.taskId;

    this.httpService.delete(url, temp.taskId).subscribe(
      data => {

      }

    );
  }

  getImages(element)
  {
    console.log("getImages");
    this.httpService.get('http://localhost:8080/file/getByTask/'+element.taskId).subscribe(
      data => {
        console.log(data);
        this.arrJson = data;
        console.log(this.arrJson.length);
        for (let i = 0; i < this.arrJson.length; i++) {
          let newImage = {name: this.arrJson[i].taskId,url:'http://localhost:8080/file/display/'+this.arrJson[i].fileId};
          this.imagesNew[i] = newImage;
          
        }
      }
    );
  }

}
