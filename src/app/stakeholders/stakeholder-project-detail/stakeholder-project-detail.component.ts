import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StakeHolderService } from '../stakeholder.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Projects, Tasks } from 'src/app/project/project-list/project-list.component';
import { TASK_CONFIG_COLUMNS } from '../config';
import { Volunteers } from 'src/app/volunteer/task-list/task-list.component';
import { PhotoComponent } from 'src/app/shared/photo/photo.component';
@Component({
  selector: 'app-stakeholder-project-detail',
  templateUrl: './stakeholder-project-detail.component.html',
  styleUrls: ['./stakeholder-project-detail.component.scss']
})
export class StakeholderProjectDetailComponent implements OnInit {
  displayedTasks: string[] = ['activity', 'task', 'duration', 'approver', 'actions'];
  projectId: string;
  project: any;
  taskSource = new MatTableDataSource<Tasks>();
  columnHeaders: string[] = [];
  tableData: Tasks[] = [];
  tasksColumnsConfig: Array<{id: string, label: string, type?: string}> = TASK_CONFIG_COLUMNS;
  taskDetails: Tasks;
  volunteer: Volunteers;
  isTaskLoaded: boolean = false;
  isLoaded: boolean = true;
  isImage: boolean = false;
  image: string = "./../../../assets/angularLogo.svg";
  images: any[]=[{name:'photo1', url:'https://d3dqioy2sca31t.cloudfront.net/Projects/cms/production/000/024/113/slideshow/2fb751a9d79c2bef5963210204348238/austria-hallstatt-daytime-mountains.jpg'},
  {name:'photo1', url:'https://st2.depositphotos.com/1004221/8723/i/950/depositphotos_87237724-stock-photo-hallstatt-mountain-village-alps-austria.jpg'},
  {name:'photo1', url:'https://travelpassionate.com/wp-content/uploads/2019/04/Scenic-view-of-famous-Hallstatt-village-in-the-Austrian-Alps.-Image-min.jpg'},
  {name:'photo1', url:'https://www.travelshelper.com/wp-content/uploads/2017/07/AUSTRIA-TRAVEL-GUIDE-Travel-S-Helper-800x600.jpg'},
  {name:'photo1', url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXVUCXTNgcJrfF7VluwC-GxtTqSgIbn7Vh6x9cedft9rOgxJfN'}];

  constructor(private route: ActivatedRoute, private stakeHolderService: StakeHolderService, private router: Router,public dialog: MatDialog) {
   }

  ngOnInit() {
    this.isLoaded = false;
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      this.stakeHolderService.getProject(this.projectId).subscribe(project => {
        this.project = project;
      })
      this.stakeHolderService.fetchTasks(this.projectId);
      this.stakeHolderService.tasksloadedEvent.subscribe(tasks => {
        this.tableData = tasks;
        // this.taskSource.data = this.tableData;
        this.taskSource = new MatTableDataSource<Tasks>(this.tableData);
        this.isLoaded = true;
        console.log(this.taskSource);
      });
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

  showTaskDetails(temp) {
    this.taskDetails = temp;
    this.volunteer = temp.volunteers;
    console.log(this.volunteer);
    this.isTaskLoaded = true;
    this.isLoaded = true;
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
    this.router.navigate(['stakeholders/projects']);
  }

}
