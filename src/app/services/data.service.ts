import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Projects } from '../_models/issue';
import { Task, Project, Message } from '../_models/model';
import { MatDialog } from '@angular/material';
import { ShowMessageComponent } from '../dialogs/show-message/show-message.component';

@Injectable()
export class DataService {
  private readonly API_URL = 'https://api.github.com/repos/angular/angular/issues';

  dataChange: BehaviorSubject<Projects[]> = new BehaviorSubject<Projects[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient,public dialog: MatDialog) {}

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
  addIssue (proj: any): void {
    this.dialogData = proj;
    console.log("proj : "+JSON.stringify(proj));
    this.httpClient.post('http://localhost:8080/project/create',proj).subscribe(
      data => {
       console.log("updated"+ ' ' + proj.ProjectId); 
       this.showMessage("Project added successfully");
      },
      err => {
        console.log("Error proj : "+proj);
        this.showMessage("Project could not be added");
      }
    );
  }

  addTask (task: any): void {
    this.dialogData = task;
    console.log("addTask(): "+JSON.stringify(task));
    this.httpClient.post('http://localhost:8080/task/create',task).subscribe(
      data => {
        this.showMessage("Task added successfully");
      },
      err => {
        console.log(task);
        this.showMessage("Task could not be added");
      }
    );
  }

  updateIssue (project: any): void {
    this.dialogData = project;
    console.log("project : "+JSON.stringify(project));
    project.stakeholder = project.stakeholderList[0];
    console.log(JSON.stringify(project.stakeholder));
    this.httpClient.post('http://localhost:8080/project/create',project).subscribe(
      data => {
       console.log("updated"+ ' ' + project.projectId);
       this.showMessage("Project Updated successfully"); 
      },
      err => {
        this.showMessage("Project could not be updated");
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

  updateTask (task: Task): void {
    this.dialogData = task;
    task.project_info = null;
    task.activity_info = null;
    console.log("updateTask(): "+JSON.stringify(task));
    this.httpClient.post('http://localhost:8080/task/create',task).subscribe(
      data => {
       console.log("updated"+ ' ' + task.taskId);
       this.showMessage("Task updated successfully");
      },
      err => {
        this.showMessage("Task could not be updated");
      }
    );
  }

  showMessage(msg: string) {
    let message: Message = { message: msg };
    const dialogRef = this.dialog.open(ShowMessageComponent, {
      data: message
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        console.log("message displayed");
        
      }
      
    });
  }

  updateComment(data): void {
    console.log(data);
    console.log('hi');
    var url = `http://localhost:8080/project/status?pid=${data.projectId}&status=${data.status}&role=${data.role}&comment=${data.comment}&rating=${data.rating}`;

    this.httpClient.post(url,data).subscribe(
      data => {
          console.log(data);
      },
      err => {
          console.log("error");
      }
    );
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
       this.showMessage("Project deleted successfully");
      },
      err => {
        this.showMessage("Project could not be deleted");
      }
    )
  }

  deleteTask (issue): void {
    console.log(issue);
    this.httpClient.delete('http://localhost:8080/task/delete?tid='+issue.taskId).subscribe(
      data => {
       console.log("Deleted Task"+ ' ' + issue.taskId); 
       this.showMessage("Task deleted successfully");
      },
      err => {
        this.showMessage("Task could not be deleted");
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




