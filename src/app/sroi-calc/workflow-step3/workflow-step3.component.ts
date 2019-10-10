import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { merge, Observable, BehaviorSubject, fromEvent } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Stackholder } from '../models/stackholder';
import { WorkflowStep3Service } from './services/workflow-step3.service';
import { WorkflowStep3AddComponent } from './dialogs/workflow-step3-add/workflow-step3-add.component';
import { WorkflowStep3EditComponent } from './dialogs/workflow-step3-edit/workflow-step3-edit.component';
import { WorkflowStep3DeleteComponent } from './dialogs/workflow-step3-delete/workflow-step3-delete.component';
import { ImpactMap } from '../models/impact-map';

@Component({
  selector: 'app-workflow-step3',
  templateUrl: './workflow-step3.component.html',
  styleUrls: ['./workflow-step3.component.scss']
})
export class WorkflowStep3Component implements OnInit {
  displayedColumns = ['stackholder', 'goalsOrOutcome','indicators','proxies','monetoryValue','source','actions'];

  exampleDatabase: WorkflowStep3Service | null;
  dataSource: WorkflowStep3DataSource | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(public httpClient: HttpClient,
     public dialog: MatDialog, 
     public workflowDataService: WorkflowStep3Service) { }


  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new WorkflowStep3Service(this.httpClient);
    this.dataSource = new WorkflowStep3DataSource(this.exampleDatabase, this.paginator, this.sort);
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

  addNew(issue: ImpactMap) {
    const dialogRef = this.dialog.open(WorkflowStep3AddComponent, {
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
  startEdit(i: number, id: number, stackholder: string, goalsOrOutcome: string, indicators:string,proxies:string,monetoryValue:number,source:number) {
    const dialogRef = this.dialog.open(WorkflowStep3EditComponent, {
      data: { id: id, stackholder: stackholder, goalsOrOutcome: goalsOrOutcome,indicators:indicators,proxies:proxies,monetoryValue:monetoryValue,source:source}
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

  deleteItem(i: number, id: number, stackholder: string, goalsOrOutcome: string, indicators:string,proxies:string,monetoryValue:number,source:number) {
    const dialogRef = this.dialog.open(WorkflowStep3DeleteComponent, {
      data: { id: id, stackholder: stackholder, goalsOrOutcome: goalsOrOutcome,indicators:indicators,proxies:proxies,monetoryValue:monetoryValue,source:source}
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

export class  WorkflowStep3DataSource extends DataSource<ImpactMap> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: ImpactMap[] = [];
  renderedData: ImpactMap[] = [];

  constructor(public workflowDataService: WorkflowStep3Service,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ImpactMap[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.workflowDataService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this.workflowDataService.getImpactMap();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this.workflowDataService.data.slice().filter((issue: ImpactMap) => {
        const searchStr = (issue.stackholder + issue.goalsOrOutcome + issue.indicators + issue.proxies + issue.monetoryValue + issue.source).toLowerCase();
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
  sortData(data: ImpactMap[]): ImpactMap[] {
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
        case 'Indicators': [propertyA, propertyB] = [a.indicators, b.indicators]; break;
        case 'Proxies': [propertyA, propertyB] = [a.proxies, b.proxies]; break;
        case 'Monetory Value (Per Unit)': [propertyA, propertyB] = [a.monetoryValue, b.monetoryValue]; break;
        case 'Source': [propertyA, propertyB] = [a.source, b.source]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}


