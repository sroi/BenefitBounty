import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { merge, Observable, BehaviorSubject, fromEvent } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';
import { DataSource } from '@angular/cdk/collections';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { WorkflowStep2Service } from './services/workflow-step2.service';
import { Stackholder } from '../models/stackholder';
import { WorkflowStep2AddComponent } from './dialogs/workflow-step2-add/workflow-step2-add.component';
import { WorkflowStep2EditComponent } from './dialogs/workflow-step2-edit/workflow-step2-edit.component';
import { WorkflowStep2DeleteComponent } from './dialogs/workflow-step2-delete/workflow-step2-delete.component';

@Component({
  selector: 'app-workflow-step2',
  templateUrl: './workflow-step2.component.html',
  styleUrls: ['./workflow-step2.component.scss']
})
export class WorkflowStep2Component implements OnInit {
  displayedColumns = ['stackholder', 'goalsOrOutcome','actions'];

  exampleDatabase: WorkflowStep2Service | null;
  dataSource: WorkflowStep2DataSource | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(public httpClient: HttpClient,
     public dialog: MatDialog, 
     public workflowDataService: WorkflowStep2Service) { }


  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new WorkflowStep2Service(this.httpClient);
    this.dataSource = new WorkflowStep2DataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  refresh() {
    this.loadData();
  }

  addNew(issue: Stackholder) {
    const dialogRef = this.dialog.open(WorkflowStep2AddComponent, {
      data: { issue: issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.workflowDataService.getDialogData());
        this.refreshTable();
      }
    });
  }
  startEdit(i: number, id: number, stackholder: string, goalsOrOutcome: string) {
    const dialogRef = this.dialog.open(WorkflowStep2EditComponent, {
      data: { id: id, stackholder: stackholder, goalsOrOutcome: goalsOrOutcome}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.workflowDataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, stackholder: string, goalsOrOutcome: string) {
    const dialogRef = this.dialog.open(WorkflowStep2DeleteComponent, {
      data: { id: id, stackholder: stackholder, goalsOrOutcome: goalsOrOutcome}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }


}

export class  WorkflowStep2DataSource extends DataSource<Stackholder> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Stackholder[] = [];
  renderedData: Stackholder[] = [];

  constructor(public workflowDataService: WorkflowStep2Service,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Stackholder[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.workflowDataService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this.workflowDataService.getStackholders();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this.workflowDataService.data.slice().filter((issue: Stackholder) => {
        const searchStr = (issue.stackholder + issue.goalsOrOutcome).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }
    ));
  }

  disconnect() { }


  /** Returns a sorted copy of the database data. */
  sortData(data: Stackholder[]): Stackholder[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'Id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'Stackholder': [propertyA, propertyB] = [a.stackholder, b.stackholder]; break;
        case 'Goals/Outcome': [propertyA, propertyB] = [a.goalsOrOutcome, b.goalsOrOutcome]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}


