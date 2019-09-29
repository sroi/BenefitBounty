import { Component, OnInit, QueryList, ViewChildren, AfterViewInit, ViewChild } from '@angular/core';
import { Projects } from 'src/app/project/project-list/project-list.component';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { StakeHolderService } from '../stakeholder.service';
import { PROJECT_COLUMN_CONFIG , ProjectColumnConfig} from '../config';

@Component({
  selector: 'app-stakeholder-project-list',
  templateUrl: './stakeholder-project-list.component.html',
  styleUrls: ['./stakeholder-project-list.component.scss']
})
export class StakeholderProjectListComponent implements OnInit, AfterViewInit {
  @ViewChild('matPaginator', {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Projects>();
  columnHeaders: string[] = [];
  tableData: Array<any> = [];
  projectColumnsConfig: Array<ProjectColumnConfig> = PROJECT_COLUMN_CONFIG;
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private stakeHolderService: StakeHolderService) {

  }
  ngOnInit() {
    this.columnHeaders = this.projectColumnsConfig.map(column => {
      return column.id;
    });
    this.columnHeaders.push('approve');
    this.columnHeaders.push('reject');
    this.columnHeaders.push('rating');
    this.stakeHolderService.fetchProjects();
    this.stakeHolderService.projectsLoadedEvent.subscribe(projects => {
      this.dataSource.data = projects;
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onRatingChange(element: any, rating: any) {
    element.rating = rating;
  }
  showProjectDetails(project: any) {
    this.router.navigate([project.projectId], {relativeTo: this.route});
  }

}
