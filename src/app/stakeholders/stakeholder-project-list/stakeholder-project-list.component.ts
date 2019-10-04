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
import { Issue } from 'src/app/models/issue';

export interface Comment {
  userId: string;
  comment: string;
  projectId: string;
}

@Component({
  selector: 'app-stakeholder-project-list',
  templateUrl: './stakeholder-project-list.component.html',
  styleUrls: ['./stakeholder-project-list.component.scss']
})

export class StakeholderProjectListComponent implements OnInit, AfterViewInit {
  @ViewChild('matPaginator', { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Projects>();
  columnHeaders: string[] = [];
  tableData: Array<any> = [];
  dataToSend: Comment;
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
    this.projectColumnsConfig = PROJECT_COLUMN_CONFIG;
    this.columnHeaders = this.projectColumnsConfig.map(column => {
      return column.id;
    });
    this.columnHeaders.push('rating');
    this.columnHeaders.push('actions');   

    this.stakeHolderService.fetchProjects();
    this.stakeHolderService.projectsLoadedEvent.subscribe(projects => {
      this.dataSource.data = projects;
      this.dataSource.paginator = this.paginator;
    });
  }

  approveProject(element) {
    this.projectComment(element);
  }

  rejectProject(element) {
    this.projectComment(element);
  }

  projectComment(element: Projects)
  {
    //console.log(element);
    this.dataToSend = {userId:'123', comment:'',projectId:'345'};
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
        this.stakeHolderService.fetchProjects();
      }
      
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

}
