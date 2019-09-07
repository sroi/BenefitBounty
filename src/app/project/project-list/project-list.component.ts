import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  private httpService: HttpClient;
  constructor() {
    
   }
  arrJson: any=[];
  keys: any=[];
  ngOnInit() {
    
  this.fetchProjects();
   
  }

  fetchProjects()
  {
    this.httpService.get('http://localhost:8080/projects').subscribe(
      data => {
        this.arrJson = data;
        for(const key in this.arrJson[0])
        {
          if(key != null)
          {
            this.keys.push(key);
          }
        }
      },
      (err: HttpErrorResponse) => {
        console.log();
      }
    )
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
