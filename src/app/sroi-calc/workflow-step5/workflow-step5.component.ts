import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { merge, Observable, BehaviorSubject, fromEvent } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { WorkflowStep5Service } from './services/workflow-step5.service';
import { WorkflowStep5AddComponent } from './dialogs/workflow-step5-add/workflow-step5-add.component';
import { WorkflowStep5EditComponent } from './dialogs/workflow-step5-edit/workflow-step5-edit.component';
import { WorkflowStep5DeleteComponent } from './dialogs/workflow-step5-delete/workflow-step5-delete.component';
import { NetPresentValue } from '../models/net-present-value';

@Component({
  selector: 'app-workflow-step5',
  templateUrl: './workflow-step5.component.html',
  styleUrls: ['./workflow-step5.component.scss']
})
export class WorkflowStep5Component implements OnInit {
  displayedColumns = ['deadweight', 'attribution','displacement','dropoff','actions'];

  exampleDatabase: WorkflowStep5Service | null;
  dataSource: WorkflowStep5DataSource | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(public httpClient: HttpClient,
     public dialog: MatDialog, 
     public workflowDataService: WorkflowStep5Service) { }


  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new WorkflowStep5Service(this.httpClient);
    this.dataSource = new WorkflowStep5DataSource(this.exampleDatabase, this.paginator, this.sort);
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

  addNew(issue: NetPresentValue) {
    const dialogRef = this.dialog.open(WorkflowStep5AddComponent, {
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
  startEdit(i: number, id:number, deadweight: number, attribution: number, displacement: number,dropoff: number) {
    const dialogRef = this.dialog.open(WorkflowStep5EditComponent, {
      data: { id: id, deadweight: deadweight, attribution: attribution,displacement:displacement,dropoff:dropoff}
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

    dropoff:number;
    deleteItem(i: number, id: number, deadweight: number, attribution: number, displacement: number,dropoff: number) {
    const dialogRef = this.dialog.open(WorkflowStep5DeleteComponent, {
      data: { id: id, deadweight: deadweight, attribution: attribution,displacement:displacement,dropoff:dropoff}
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

export class  WorkflowStep5DataSource extends DataSource<NetPresentValue> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: NetPresentValue[] = [];
  renderedData: NetPresentValue[] = [];

  constructor(public workflowDataService: WorkflowStep5Service,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<NetPresentValue[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.workflowDataService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this.workflowDataService.getNetPresentValue();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this.workflowDataService.data.slice().filter((issue: NetPresentValue) => {
        const searchStr = (issue.deadweight + issue.attribution + issue.displacement + issue.dropoff).toString().toLowerCase();
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
  sortData(data: NetPresentValue[]): NetPresentValue[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'Id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'Deadweight': [propertyA, propertyB] = [a.deadweight, b.deadweight]; break;
        case 'Attribution': [propertyA, propertyB] = [a.attribution, b.attribution]; break;
        case 'Displacement': [propertyA, propertyB] = [a.displacement, b.displacement]; break;
        case 'Drop off': [propertyA, propertyB] = [a.dropoff, b.dropoff]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}


