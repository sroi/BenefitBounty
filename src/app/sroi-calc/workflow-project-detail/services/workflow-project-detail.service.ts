import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Project } from 'src/app/project/_model';


@Injectable({
  providedIn: 'root'
})
export class WorkflowProjectDetailService {

  private fetchProjectUrl='http://localhost:8080/project/showall'
  private fetchProjectDetailsUrl = 'http://localhost:8080/task/tasks?pid=';

  constructor(private httpClient:HttpClient) { }

  fetchProjects():Observable<Project[]>
  {
    return this.httpClient.get<Project[]>(this.fetchProjectUrl).pipe(catchError(this.handleError)) 
  }

  fetchProjectTasks():Observable<Project[]>
  {
    return this.httpClient.get<Project[]>(this.fetchProjectDetailsUrl).pipe(catchError(this.handleError)) 
  }

  

  private handleError(err:HttpErrorResponse){
    let errorMessage='';
    if(err.error instanceof ErrorEvent){
        errorMessage=`An error occurred: ${err.error.message}`;
    }
    else{
        errorMessage=`Server returend code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
}
}
