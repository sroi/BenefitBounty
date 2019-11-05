
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit, ViewChild, QueryList, ViewChildren, Input, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { EditTaskComponent } from 'src/app/dialogs/edit-task/edit-task.component';
import { DeleteTaskComponent } from 'src/app/dialogs/delete-task/delete-task.component';
import { DataService } from 'src/app/services/data.service';
import { PhotoComponent } from 'src/app/shared/photo/photo.component';
import { CommentComponent } from 'src/app/dialogs/comment/comment.component';
import { EditVolunteerComponent } from 'src/app/dialogs/edit-volunteer/edit-volunteer.component';
import { FileuploadComponent } from 'src/app/widgets/fileupload.component';
import { FileUploadService } from 'src/app/services/fileUpload.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ProjectStatus, Task, Activity, UserComment, Message, image } from 'src/app/_models/model';
import { UserCommentsComponent } from 'src/app/dialogs/user-comments/user-comments.component';
import { ShowMessageComponent } from 'src/app/dialogs/show-message/show-message.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {


  displayedTasks: string[] = ['project', 'activity', 'task', 'duration', 'approver', 'status', 'actions'];

  displayedActivity: string[] = ['userId', 'activity', 'comments', 'uploads', 'timeEntered', 'updatedOn'];
  projectStatus: ProjectStatus[] = [
    { value: 'In Progress', viewValue: 'In Progress' },
    { value: 'On Hold', viewValue: 'On Hold' },
    { value: 'Closed', viewValue: 'Closed' }
  ];
  uploadForm: FormGroup;

  imagesNew: image[] = [];
  excelFiles: image[] = [];

  images: any[] = [{ name: 'photo1', url: 'https://d3dqioy2sca31t.cloudfront.net/Projects/cms/production/000/024/113/slideshow/2fb751a9d79c2bef5963210204348238/austria-hallstatt-daytime-mountains.jpg' },
  { name: 'photo1', url: 'https://st2.depositphotos.com/1004221/8723/i/950/depositphotos_87237724-stock-photo-hallstatt-mountain-village-alps-austria.jpg' },
  { name: 'photo1', url: 'https://travelpassionate.com/wp-content/uploads/2019/04/Scenic-view-of-famous-Hallstatt-village-in-the-Austrian-Alps.-Image-min.jpg' },
  { name: 'photo1', url: 'https://www.travelshelper.com/wp-content/uploads/2017/07/AUSTRIA-TRAVEL-GUIDE-Travel-S-Helper-800x600.jpg' },
  { name: 'photo1', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXVUCXTNgcJrfF7VluwC-GxtTqSgIbn7Vh6x9cedft9rOgxJfN' }];

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
  image: string = "./../../../assets/ExcelLogo.png";
  excelImage: string = "./../../../assets/ExcelLogo.png";
  userId: string;
  role: string;
  isApprover: boolean = false;
  isVolunteer: boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataToSend: { userId: string; comment: string; taskId: string; workingHours: number; };
  selectedFile: string | Blob;
  volunteerComments: UserComment = { userId: '123', comment: 'new' };
  approverComment: UserComment = { userId: '123', comment: 'new approver' };
  headers: HttpHeaders;

  // @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  // @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  @Input()
  mode
  @Input()
  names
  @Input()
  url
  @Input()
  method
  @Input()
  multiple
  @Input()
  disabled
  @Input()
  accept
  @Input()
  maxFileSize
  @Input()
  auto = true
  @Input()
  withCredentials
  @Input()
  invalidFileSizeMessageSummary
  @Input()
  invalidFileSizeMessageDetail
  @Input()
  invalidFileTypeMessageSummary
  @Input()
  invalidFileTypeMessageDetail
  @Input()
  previewWidth
  @Input()
  chooseLabel = 'Choose'
  @Input()
  uploadLabel = 'Upload'
  @Input()
  cancelLabel = 'Cance'
  @Input()
  customUpload
  @Input()
  showUploadButton
  @Input()
  showCancelButton


  @Input()
  dataUriPrefix
  @Input()
  deleteButtonLabel
  @Input()
  deleteButtonIcon = 'close'
  @Input()
  showUploadInfo

  /**
   *
   */


  @ViewChild('fileUpload', { static: false }) fileUpload: any;

  inputFileName: string

  @Input()
  files: File[] = [];

  constructor(private sanitizer: DomSanitizer, private httpService: HttpClient,private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog, public dataService: DataService, public fileUploadService: FileUploadService) {

  }
  arrJson: any = [];
  taskJson: any = [];
  activityJson: any = [];
  keys: any = [];
  ngOnInit() {
    this.role = "Volunteer";
    this.userId = "5d9984b61c9d440000d024be";
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
    this.showDetails(this.userId, this.role);
    
  }



  onFileComplete(data: any) {
    console.log(data); // We just print out data bubbled up from event emitter.
  }

  ngAfterViewInit() {
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

  editTaskComment(element) {
    //console.log(element);
    this.dataToSend = { userId: this.userId, comment: '', taskId: element.taskId, workingHours: 0 };
    const dialogRef = this.dialog.open(EditVolunteerComponent, {
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
        this.showDetails(this.userId,this.role);
        this.showMessage("Your activity has been recorded successfully");
      }
      if(result === 0) {
        this.showMessage("Please Enter your details again");
      }

    });

  }

  refreshData(){
    this.showDetails(this.userId,this.role);
  }

  isApproved(element) {
    return element.status==="Approved"?true:false;
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

  showEdit(element): boolean {
    return (element.status == "Approved") ? false : true;
  }

  changeTaskStatus(element: Task, status) {
    var tid = element.taskId;
    var url = `${this.taskApiUrl}/status?tid=${tid}&role=${this.role}&status=${status}`

    this.httpService.put(url, 0).subscribe(() => {
      this.showDetails(this.userId, this.role);
    })
  }

  openImage(image: any) {
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
    link.download = "abcd";
    link.href = file.url;
    console.log(link);
    link.click();
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
        console.log("message displayed");
        // this.showDetails(this.userId, this.role);
        this.showTaskDetails(this.taskDetails);
      }
      this.removeUploadedFile();
      // this.showDetails(this.userId, this.role);
      this.showTaskDetails(this.taskDetails);
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
    console.log("showDetails loaded" + temp.taskId);

    let url = `${this.taskApiUrl}/task?tid=${temp.taskId}`;
    this.activityData = [];
    this.httpService.get(url).subscribe(
      data => {

        this.activityJson = data;
        console.log(this.activityJson);
        console.log("activity recieved " + this.activityJson.length);
        for (let i = 0; i < this.activityJson.length; i++) {

          this.activityData[i] = this.activityJson[i];

          // this.taskDetails = this.activityData[i];
        }


        this.isLoaded = true;
        this.isLoaded1 = true;
        this.isSpinnerEnabled = false;
        this.activitySource = new MatTableDataSource<Activity>(this.activityData);

        console.log("activitySource recieved " + this.activitySource);
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



  editTask(element) {
    console.log(element);
    this.editTaskComment(element);
  }

  deleteTask(temp) {
    console.log(temp);
    this.taskSource.data = this.taskSource.data.filter((task: Task) => {
      return task.taskId != temp.taskId;
    })
    let url = `${this.taskApiUrl}/delete?tid=${temp.taskId}`;

    this.httpService.delete(url, temp.taskId).subscribe(
      data => {

      }

    );
  }

  onFileSelected1(event) {
    this.selectedFile = event.target.files[0];

  }
  onUpload1() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.taskDetails.taskId);

    this.httpService.post('someurl', fd).subscribe(
      res => {

      }
    )

  }

  selectFile() {
    this.fileUpload.nativeElement.click();
  }


  onClick(event) {
    //if (this.fileUpload)
    this.fileUpload.nativeElement.click();

    console.log(event);
  }

  onInput(event) {

  }

  onFileSelected(event) {
    let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    console.log('event::::::', event)
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      const file1 = event.target.files[0];
      this.uploadForm.get('file').setValue(file1);

      //if(!this.isFileSelected(file)){
      if (this.validate(file)) {
        //      if(this.isImage(file)) {
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
        //      }
        if (!this.isMultiple()) {
          this.files = []
        }
        this.files.push(files[i]);
        //  }
      }
      //}
    }
    this.onUpload();
  }

  removeFile(event, file) {
    let ix
    if (this.files && -1 !== (ix = this.files.indexOf(file))) {
      this.files.splice(ix, 1)
      this.clearInputElement()
    }
  }

  removeUploadedFile() {
    let ix;
    for(let file of this.files)
    {
      if (this.files && -1 !== (ix = this.files.indexOf(file))) {
        this.files.splice(ix, 1)
        this.clearInputElement()
      }
    }
    
  }

  validate(file: File) {
    for (const f of this.files) {
      if (f.name === file.name
        && f.lastModified === file.lastModified
        && f.size === f.size
        && f.type === f.type
      ) {
        return false
      }
    }
    return true
  }

  clearInputElement() {
    this.fileUpload.nativeElement.value = ''
  }


  isMultiple(): boolean {
    return this.multiple
  }

  onUpload() {
    // const fd = new FormData();
    // fd.append('image',this.selectedFile,this.taskDetails.taskId);

    // this.httpService.post('someurl',fd).subscribe(
    //   res => {

    //   }
    // )
    console.log('onUpload');
    const formData: FormData = new FormData();
    formData.append('taskId', this.taskDetails.taskId);
    formData.append('file', this.uploadForm.get('file').value,this.uploadForm.get('file').value.name);
    this.headers= new HttpHeaders();
    this.headers.set('Content-Type','multipart/form-data');
    //  : {
    //   'Content-Type': 'multipart/form-data'
    // }
    // formData.append(this.taskDetails.taskId, this.files[0]);
    // const req = new HttpRequest('POST','http://localhost:8080/file/upload',formData);
    var uploadUrl = 'http://localhost:8080/file/upload';
    var ret = this.httpService.post(uploadUrl, formData);
    
    ret.subscribe(
      data =>{
        console.log("Image upload");
        console.log('data '+data);
        console.log(data);
        this.showMessage("File uploaded successfully");
        
      },
      err =>{
        this.showMessage("File upload failed");
      }
    );
    console.log('upload complete');
    

    // this.httpService.post('localhost:8080/file/upload', formData ,
    // {headers : this.headers}
    // ).subscribe(
    //   res => {
    //     console.log(res);

    //   }
    // );
    
    //console.log(this.uploadForm.get('file').value);
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
        for (let i = 0; i < this.arrJson.length; i++) {
          console.log(this.arrJson[i]);
          let newImage = {name: this.arrJson[i].fileName,url:'http://localhost:8080/file/display/'+this.arrJson[i].fileId};
          if(newImage.name.indexOf('.xlsx')!=-1)
          {
            this.excelFiles[j] = newImage;
            j++;
            continue;
          }
          this.imagesNew[i] = newImage;
        }
      }
    );
  }

}
