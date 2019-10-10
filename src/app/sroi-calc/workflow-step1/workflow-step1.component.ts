import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { EstablishingScope } from '../models/scope';
import { merge, Observable, BehaviorSubject, fromEvent } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { WorkflowStep1AddComponent } from './dialogs/workflow-step1-add/workflow-step1-add.component';
import { WorkflowStep1EditComponent } from './dialogs/workflow-step1-edit/workflow-step1-edit.component';
import { WorkflowStep1DeleteComponent } from './dialogs/workflow-step1-delete/workflow-step1-delete.component';
import { WorkflowStep1Service } from './services/workflow-step1.service';

@Component({
  selector: 'app-workflow-step1',
  templateUrl: './workflow-step1.component.html',
  styleUrls: ['./workflow-step1.component.scss']
})
export class WorkflowStep1Component implements OnInit {
  displayedColumns = ['scope', 'workplan', 'resources', 'timeLine', 'actions'];

  exampleDatabase: WorkflowStep1Service | null;
  dataSource: WorkflowStep1DataSource | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  
  constructor(public httpClient: HttpClient,
     public dialog: MatDialog, 
     public workflowDataService: WorkflowStep1Service) { }


  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new WorkflowStep1Service(this.httpClient);
    this.dataSource = new WorkflowStep1DataSource(this.exampleDatabase, this.paginator, this.sort);
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

  addNew(issue: EstablishingScope) {
    const dialogRef = this.dialog.open(WorkflowStep1AddComponent, {
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
  startEdit(i: number, id: number, scope: string, workplan: string, resources: string, timeLine: string) {
    const dialogRef = this.dialog.open(WorkflowStep1EditComponent, {
      data: { id: id, scope: scope, workplan: workplan, resources: resources, timeLine: timeLine }
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

  deleteItem(i: number, id: number, scope: string, workplan: string, resources: string, timeLine: string) {
    const dialogRef = this.dialog.open(WorkflowStep1DeleteComponent, {
      data: { id: id, scope: scope, workplan: workplan, resources: resources, timeLine: timeLine }
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
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  save(){
    console.log(JSON.stringify(this.dataSource.renderedData));    
    this.workflowDataService.saveEstablishingScopes(this.dataSource.renderedData).subscribe(x=>{

    },error =>{
      console.log(error);      
    });
  }


}

export class  WorkflowStep1DataSource extends DataSource<EstablishingScope> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: EstablishingScope[] = [];
  renderedData: EstablishingScope[] = [];

  constructor(public workflowDataService: WorkflowStep1Service,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<EstablishingScope[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.workflowDataService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this.workflowDataService.getEstablishingScopes();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this.workflowDataService.data.slice().filter((issue: EstablishingScope) => {
        const searchStr = (issue.scope + issue.workplan + issue.resources + issue.timeLine).toLowerCase();
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
  sortData(data: EstablishingScope[]): EstablishingScope[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'Id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'Scope': [propertyA, propertyB] = [a.scope, b.scope]; break;
        case 'workplan': [propertyA, propertyB] = [a.workplan, b.workplan]; break;
        case 'resources': [propertyA, propertyB] = [a.resources, b.resources]; break;
        case 'timeLine': [propertyA, propertyB] = [a.timeLine, b.timeLine]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}


