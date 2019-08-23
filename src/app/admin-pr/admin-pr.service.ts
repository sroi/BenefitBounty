import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IProject } from './project';

@Injectable({
  providedIn: 'root'
})
export class AdminPrService {
  private addProjectUrl = 'http://localhost:8080/admin/createPr';

  constructor(private http: HttpClient ) {}

  addProject(project: IProject): Observable<IProject> {
    console.log("Project added successfully");
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(project));
    //return this.http.post<IProject>(this.addProjectUrl,project,httpOptions);
    return this.http.post<IProject>(this.addProjectUrl,project);
      // .pipe(
      //   tap(data => console.log('All: ' + JSON.stringify(data))),
      //   catchError(this.handleError)
      // );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
    'Accept': 'application/json, text/plain, */*',
    'Access-Control-Allow-Origin':'*'
  })
}
