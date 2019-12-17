import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StakeHolderService } from '../stakeholder.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Projects, Tasks } from 'src/app/project/project-list/project-list.component';
import { TASK_CONFIG_COLUMNS } from '../config';
import { PhotoComponent } from 'src/app/shared/photo/photo.component';
import { Volunteers } from 'src/app/_models/issue';
import { UserComment, Task, image, Project } from 'src/app/_models/model';
import { HttpClient } from '@angular/common/http';
import { UserCommentsComponent } from 'src/app/dialogs/user-comments/user-comments.component';


@Component({
  selector: 'app-stakeholder-project-detail',
  templateUrl: './stakeholder-project-detail.component.html',
  styleUrls: ['./stakeholder-project-detail.component.scss']
})
export class StakeholderProjectDetailComponent implements OnInit {
  displayedTasks: string[] = ['activity', 'task', 'duration', 'approver', 'actions'];
  projectId: string;
  project: Project;
  taskSource = new MatTableDataSource<Task>();
  columnHeaders: string[] = [];
  tableData: Task[] = [];
  tasksColumnsConfig: Array<{id: string, label: string, type?: string}> = TASK_CONFIG_COLUMNS;
  taskDetails: Task;
  volunteer: Volunteers;
  isTaskLoaded: boolean = false;
  isLoaded: boolean = true;
  isLoaded1: boolean = true;
  isImage: boolean = false;
  hostname = "http://localhost:";
  portNo = "8080";
  taskApiUrl = this.hostname + this.portNo + "/task";
  volunteerComments: UserComment = {userId:'123',comment:'new'};
  approverComment: UserComment = {userId:'123',comment:'new approver'};
  stakeholdersComment: UserComment = {userId:'123',comment:'new stakeholder'};
  image: string = "./../../../assets/angularLogo.svg";
  userId: string;
  role: string;
  isApprover: boolean = false;
  isVolunteer: boolean = false;
  isStakeholder: boolean = false;
  isPointOfContact: boolean = false;
  isClosed: boolean = false;
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

  constructor(private route: ActivatedRoute, private httpService: HttpClient,private stakeHolderService: StakeHolderService, private router: Router,public dialog: MatDialog) {
   }

   arrJson: any = [];
  taskJson: any = [];
  activityJson: any = [];
  keys: any = [];

  ngOnInit() {
    this.hideTaskDetails();
    this.isLoaded = false;
    this.isTaskLoaded = false;
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      // this.stakeHolderService.getProject(this.projectId).subscribe(project => {
      //   this.project = project;
      // })
      // this.project = params['id'];
      // this.projectId = "5d997aec1c9d440000d024b8";
      this.httpService.get('http://localhost:8080/project/get?pid='+this.projectId).subscribe(
        data => {
          console.log("data");
          console.log(data);
          this.arrJson = data;
          this.project = this.arrJson;
          this.stakeHolderService.fetchTasks(this.projectId);
      this.stakeHolderService.tasksloadedEvent.subscribe(tasks => {
        this.tableData = tasks;
        // this.project = tasks[0].project_info;
        console.log(tasks);
        console.log(this.project.stakeholder);
        if(this.project.stakeholder != null)
          this.isStakeholder = true;
        console.log(this.project.pointOfContact);
        if(this.project.pointOfContact != null)
          this.isPointOfContact = true;

        
        // this.taskSource.data = this.tableData;
        this.taskSource = new MatTableDataSource<Task>(this.tableData);
        this.isLoaded = true;
        this.isTaskLoaded = false;
        console.log(tasks);
      });
        }
      );
      
    });
    this.columnHeaders = this.tasksColumnsConfig.map(taskColumn => {
      return taskColumn.id;
    });
    this.columnHeaders.push('actions');
    
    
  }

  openImage(image:any)
  {
    const dialogRef = this.dialog.open(PhotoComponent, {
      data: image
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
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

  showComments() {
    const dialogRef = this.dialog.open(UserCommentsComponent, {
      data: this.taskDetails
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  showTaskDetails(temp) {
    console.log(temp);
    let tid = temp.taskId;
    this.isApprover = false;
    this.isVolunteer = false;
    this.isTaskLoaded = false;
    // localhost:8080/task/task?tid=5d9ad71f99097f28a943348c
    let url = `${this.taskApiUrl}/task?tid=${tid}`;
    this.httpService.get(url).subscribe(
      data => {
        this.taskJson = data;
        this.taskDetails = this.taskJson;
        if (this.taskDetails.approver_info != null)
          this.isApprover = true;
        if (this.taskDetails.vols_info.length > 1)
          this.isVolunteer = true;
        this.isTaskLoaded = true;
        this.isLoaded = true;
        this.isLoaded1 = true;
        console.log(this.taskDetails);
        this.getImages(this.taskDetails);
      }
    );
    


  }

  getImages(element)
  {
    this.imagesNew = [];
    this.excelFiles = [];
    this.txtFiles = [];
    this.wordFiles = [];
    this.pdfFiles = [];
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
          if(newImage.name==null) continue;
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

  showImage() {
    this.isImage = true;
  }
  hideImage() {
    this.isImage = false;
  }
  
  deleteTask(temp: any) {
    this.stakeHolderService.deleteTask(temp);
  }
  onCloseProject() {
    this.router.navigate(['stakeholder']);
  }

}
