import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Issue, Tasks} from '../models/issue';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Project } from '../project/_model';
import { Projects } from '../volunteer/task-list/task-list.component';

@Injectable()
export class DataService {
  private readonly API_URL = 'https://api.github.com/repos/angular/angular/issues';

  dataChange: BehaviorSubject<Projects[]> = new BehaviorSubject<Projects[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): Projects[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllProjects(): void {
    this.httpClient.get<Projects[]>('http://localhost:8080/project/all').subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  // DEMO ONLY, you can find working methods below
  addIssue (issue: Projects): void {
    this.dialogData = issue;
  }

  addTask (issue: Tasks): void {
    this.dialogData = issue;
  }

  updateIssue (issue: Projects): void {
    this.dialogData = issue;
    console.log(issue);
    this.httpClient.post('http://localhost:8080/project/create',issue).subscribe(
      data => {
       console.log("updated"+ ' ' + issue.projectId); 
      }
    );
  }

  updateTask (issue: Tasks): void {
    this.dialogData = issue;
    console.log(issue);
    this.httpClient.post('http://localhost:8080/task/create',issue).subscribe(
      data => {
       console.log("updated"+ ' ' + issue.taskId); 
      }
    );
  }

  updateComment(issue: Comment): void {
    console.log(issue);
    console.log('hi');
  }

  deleteIssue (issue): void {
    console.log(issue);
    this.httpClient.delete('http://localhost:8080/project/delete?pid='+issue.projectId).subscribe(
      data => {
       console.log("Deleted Project"+ ' ' + issue.projectId); 
      }
    )
  }

  deleteTask (issue): void {
    console.log(issue);
    this.httpClient.delete('http://localhost:8080/task/delete?tid='+issue.taskId).subscribe(
      data => {
       console.log("Deleted Task"+ ' ' + issue.taskId); 
      }
    )
  }
  
}



/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/




