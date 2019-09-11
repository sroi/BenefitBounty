import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  private httpService: HttpClient;
  constructor() { }

  ngOnInit() {
    this.fetchTasks();
  }
  arrJson: any=[];
  keys: any=[];
  fetchTasks()
  {
    this.httpService.get('http://localhost:8080/tasks').subscribe(
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
  deleteTask()
  {
    this.httpService.delete('http://localhost:8080/projects').subscribe(
      data => {
        if(data==0)
        {
          console.log('deleted');
        }
        this.ngOnInit();
      }
    )
  }

}
