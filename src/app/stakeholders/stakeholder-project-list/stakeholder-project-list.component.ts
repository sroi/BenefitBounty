import { Component, OnInit, QueryList, ViewChildren, AfterViewInit, ViewChild } from '@angular/core';
import { Projects } from 'src/app/project/project-list/project-list.component';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { StakeHolderService } from '../stakeholder.service';
import { PROJECT_COLUMN_CONFIG, ProjectColumnConfig } from '../config';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { CommentComponent } from 'src/app/dialogs/comment/comment.component';
import { DataService } from 'src/app/services/data.service';
import { Project } from 'src/app/_models/model';

export interface Comment {
  userId: string;
  comment: string;
  projectId: string;
  status: string;
  role: string;
  rating: number;
  name: string;
}

@Component({
  selector: 'app-stakeholder-project-list',
  templateUrl: './stakeholder-project-list.component.html',
  styleUrls: ['./stakeholder-project-list.component.scss']
})

export class StakeholderProjectListComponent implements OnInit, AfterViewInit {
  @ViewChild('matPaginator', { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Project>();
  columnHeaders: string[] = [];
  tableData: Array<any> = [];
  dataToSend: Comment;
  userId: string;
  role: string;
  projectColumnsConfig: Array<ProjectColumnConfig>;
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private stakeHolderService: StakeHolderService,
    public dialog: MatDialog,public dataService: DataService) {

  }
  ngOnInit() {
    this.role = "Stakeholder";
    this.userId = "annahazare@gmail.com";
    this.projectColumnsConfig = PROJECT_COLUMN_CONFIG;
    this.columnHeaders = this.projectColumnsConfig.map(column => {
      return column.id;
    });
    this.columnHeaders.push('rating');
    this.columnHeaders.push('actions');   

    this.stakeHolderService.fetchProjects(this.userId,this.role);
    this.stakeHolderService.projectsLoadedEvent.subscribe(projects => {
      console.log(projects);
      this.dataSource.data = projects;
      this.dataSource.paginator = this.paginator;
    });
  }

  checkStatus(element)
  {
    return element.status=="Closed"?true:false;
  }

  approveProject(element) {
    this.projectComment(element,'Approved');
  }

  rejectProject(element) {
    this.projectComment(element,'Rejected');
  }

  projectComment(element: Project,status:string)
  {
    //console.log(element);
    this.dataToSend = {userId:this.userId, comment:'',projectId:element.projectId,status: status,role:'Stakeholder',rating:element.rating,name:element.name};
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
        this.refreshData();
      }
      // this.stakeHolderService.fetchProjects(this.userId,this.role);
      this.refreshData();
      
    });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    console.log(filterValue);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onRatingChange(element: any, rating: any) {
    element.rating = rating;
  }
  showProjectDetails(project: any) {
    console.log(project.projectId);
    this.router.navigate([project.projectId], { relativeTo: this.route });
  }
  refreshData(){
    this.router.navigate(['stakeholder']);
    this.stakeHolderService.fetchProjects(this.userId,this.role);
  }

}
