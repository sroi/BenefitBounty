import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { merge, Observable, BehaviorSubject, fromEvent } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { WorkflowStep4Service } from './services/workflow-Step4.service';
import { WorkflowStep4AddComponent } from './dialogs/workflow-Step4-add/workflow-Step4-add.component';
import { WorkflowStep4EditComponent } from './dialogs/workflow-Step4-edit/workflow-Step4-edit.component';
import { WorkflowStep4DeleteComponent } from './dialogs/workflow-Step4-delete/workflow-Step4-delete.component';
import { PresentValue } from '../models/present-value';

@Component({
  selector: 'app-workflow-step4',
  templateUrl: './workflow-step4.component.html',
  styleUrls: ['./workflow-step4.component.scss']
})
export class WorkflowStep4Component implements OnInit {
  displayedColumns = ['stackholder', 'goalsOrOutcome','indicators','proxies','monetoryValue','multiplier','presentValue','source','actions'];

  exampleDatabase: WorkflowStep4Service | null;
  dataSource: WorkflowStep4DataSource | null;
  PvValue:number=0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  constructor(public httpClient: HttpClient,
     public dialog: MatDialog, 
     public workflowDataService: WorkflowStep4Service) { }


  ngOnInit() {
    this.loadData();   
  }

  public loadData() {
    this.exampleDatabase = new WorkflowStep4Service(this.httpClient);
    this.dataSource = new WorkflowStep4DataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
        this.refreshTable();
      });
  }

  refresh() {
    this.loadData();   
  }

  addNew(issue: PresentValue) {
    const dialogRef = this.dialog.open(WorkflowStep4AddComponent, {
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
  startEdit(i: number, id: number, stackholder: string, goalsOrOutcome: string, indicators:string,proxies:string,monetoryValue:number,multiplier:number,presentValue:number,source:number) {
    const dialogRef = this.dialog.open(WorkflowStep4EditComponent, {
      data: {  id: id, stackholder: stackholder, goalsOrOutcome: goalsOrOutcome,indicators:indicators,proxies:proxies,monetoryValue:monetoryValue,multiplier:multiplier,presentValue:presentValue,source:source}
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

  deleteItem(i: number, id: number, stackholder: string, goalsOrOutcome: string, indicators:string,proxies:string,monetoryValue:number,multiplier:number,presentValue:number,source:number) {
    const dialogRef = this.dialog.open(WorkflowStep4DeleteComponent, {
      data: { id: id, stackholder: stackholder, goalsOrOutcome: goalsOrOutcome,indicators:indicators,proxies:proxies,monetoryValue:monetoryValue,multiplier:multiplier,presentValue:presentValue,source:source}
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

  calculatePvValue()
  {
    console.log("calculatePvValue");
    
    this.dataSource.renderedData.forEach(x=>{
      console.log(x.presentValue);
      this.PvValue += x.presentValue
    })
  }


  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
    this.calculatePvValue();
  }
}

export class  WorkflowStep4DataSource extends DataSource<PresentValue> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: PresentValue[] = [];
  renderedData: PresentValue[] = [];

  constructor(public workflowDataService: WorkflowStep4Service,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<PresentValue[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.workflowDataService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this.workflowDataService.getPresentValue();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this.workflowDataService.data.slice().filter((issue: PresentValue) => {
        const searchStr = (issue.stackholder + issue.goalsOrOutcome + issue.indicators + issue.proxies + issue.monetoryValue+issue.multiplier+issue.presentValue+ issue.source).toLowerCase();
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
  sortData(data: PresentValue[]): PresentValue[] {
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
        case 'Multiplier': [propertyA, propertyB] = [a.multiplier, b.multiplier]; break;
        case 'Present Value': [propertyA, propertyB] = [a.presentValue, b.presentValue]; break;
        case 'Source': [propertyA, propertyB] = [a.source, b.source]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}


