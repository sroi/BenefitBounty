import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Project } from '../project/_model';
import { Projects } from '../_models/issue';
import { Task } from '../_models/model';

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
  addIssue (issue: Project): void {
    this.dialogData = issue;
    console.log(issue);
    this.httpClient.post('http://localhost:8080/project/create',issue).subscribe(
      data => {
       console.log("updated"+ ' ' + issue.projectId); 
      },
      err => {
        console.log(issue);
      }
    );
  }

  addTask (issue: Task): void {
    this.dialogData = issue;
    this.httpClient.post('http://localhost:8080/task/create',issue).subscribe(
      data => {

      },
      err => {
        console.log(issue);
      }
    );
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

  //Todo: provide body for Put, provide userid 
  updateVolunteerTask(obj): void {
    console.log(obj);
    this.httpClient.put(`http://localhost:8080/task/status?tid=${obj.taskId}&role=Volunteer&comments=${obj.comment}&time=${obj.workingHours}&status=Submitted`,"Body").subscribe(
      data => {
       console.log("updated"+ ' ' + obj.projectId); 
      }
    );
  }

  updateTask (issue: Task): void {
    this.dialogData = issue;
    console.log(issue);
    this.httpClient.post('http://localhost:8080/task/create',issue).subscribe(
      data => {
       console.log("updated"+ ' ' + issue.taskId); 
      }
    );
  }

  updateComment(data): void {
    console.log(data);
    console.log('hi');
    var url = `http://localhost:8080/project/status?tid=${data.projectId}&role=Stakeholder&status=${data.status}&comments=${data.comment}`;
  }

  updateApproverComment(data: any): void {
    console.log(data);
    var url = `http://localhost:8080/task/status?tid=${data.taskId}&role=Approver&status=${data.status}&comments=${data.comment}`;
    
    this.httpClient.put(url, 0).subscribe(() => {
     
    })
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




