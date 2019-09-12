import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';


export interface PeriodicElement {
  name: string;
  area: String;
  duration: number;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {area: "Goregaon", name: 'Utkarsh', duration: 1.0079, status: 'active'},
  {area: "Goregaon", name: 'NGO', duration: 4.0026, status: 'active'},
  {area: "Malad", name: 'NGO2', duration: 6.941, status: 'active'},
  {area: "Malad", name: 'Utkarsh2', duration: 9.0122, status: 'active'},
  {area: "Goregaon", name: 'NGO3', duration: 10.811, status: 'Inactive'},
  {area: "Goregaon", name: 'NGO5', duration: 12.0107, status: 'Inactive'},
  {area: "Malad", name: 'NGO4', duration: 14.0067, status: 'Inactive'},
  {area: "Malad", name: 'Utkarsh3', duration: 15.9994, status: 'active'},
  {area: "Andheri", name: 'NGO7', duration: 18.9984, status: 'Inactive'},
  {area: "Goregaon", name: 'NGO9', duration: 20.1797, status: 'Inactive'},
  {area: "Andheri", name: 'Utkarsh4', duration: 1.0079, status: 'active'},
  {area: "Andheri", name: 'Utkarsh5', duration: 4.0026, status: 'Inactive'},
  {area: "Malad", name: 'NGO10', duration: 6.941, status: 'Inactive'},
  {area: "Malad", name: 'Utkarsh6', duration: 9.0122, status: 'Inactive'},
  {area: "Malad", name: 'NGO11', duration: 10.811, status: 'Inactive'},
];

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  displayedColumns: string[] = ['area', 'name', 'duration', 'status', 'edit','delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;

  constructor(private httpService: HttpClient) {
    
   }
  arrJson: any=[];
  keys: any=[];
  ngOnInit() {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  this.fetchProjects();
   
  }

  fetchProjects()
  {
    // this.httpService.get('http://localhost:8080/projects').subscribe(
    //   data => {
    //     this.arrJson = data;
    //     for(const key in this.arrJson[0])
    //     {
    //       if(key != null)
    //       {
    //         this.keys.push(key);
    //       }
    //     }
    //   },
    //   (err: HttpErrorResponse) => {
    //     console.log();
    //   }
    // )
  }

  
  showDetails()
  {
    document.getElementById("projectDetails").hidden = false;
  }

  hideDetails()
  {
    document.getElementById("projectDetails").hidden = true;
  }

}
