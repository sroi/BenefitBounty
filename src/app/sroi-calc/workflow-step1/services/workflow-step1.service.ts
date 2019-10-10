import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EstablishingScope } from '../../models/scope';

@Injectable({
  providedIn: 'root'
})
export class WorkflowStep1Service {

  constructor(private httpClient: HttpClient) { } dataChange: BehaviorSubject<EstablishingScope[]> = new BehaviorSubject<EstablishingScope[]>([]);
  dialogData: any;
  private saveEstablishingScopesUrl='http://localhost:40123/SROI/saveEstablishingScopes'

  get data(): EstablishingScope[] {
      return this.dataChange.value;
  }

  getDialogData() {
      return this.dialogData;
  }

  // getEstablishingScopes():Observable<EstablishingScope[]>
  // {
  //     const establishingScopeObservable = new Observable<EstablishingScope[]>((observer) => {

  //         // observable execution
  //         observer.next([
  //             {id:1, scope:"TestScope 1",workplan:"TestWorkplan",resources:"TestResources",timeLine:"TestTimeLine"},
  //             {id:2, scope:"TestScope 2",workplan:"TestWorkplan",resources:"TestResources",timeLine:"TestTimeLine"},
  //             {id:3, scope:"TestScope 3",workplan:"TestWorkplan",resources:"TestResources",timeLine:"TestTimeLine"}
  //         ])
  //         observer.complete()
  //     })
  //     return  establishingScopeObservable;
  // }

  getEstablishingScopes(): void {
      // observable execution
      this.dataChange.next([
          { id: 1, scope: "TestScope 1", workplan: "TestWorkplan", resources: "TestResources", timeLine: "TestTimeLine" },
          { id: 2, scope: "TestScope 2", workplan: "TestWorkplan", resources: "TestResources", timeLine: "TestTimeLine" },
          { id: 3, scope: "TestScope 3", workplan: "TestWorkplan", resources: "TestResources", timeLine: "TestTimeLine" }
      ])
  }

  saveEstablishingScopes(establishingScopes:EstablishingScope[]):Observable<any>
  {
   return this.httpClient.post(this.saveEstablishingScopesUrl,establishingScopes).pipe(catchError(this.handleError))     
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

  // DEMO ONLY, you can find working methods below
  addIssue(issue: EstablishingScope): void {
      this.dialogData = issue;
  }

  updateIssue(issue: EstablishingScope): void {
      this.dialogData = issue;
  }

  deleteIssue(id: number): void {
      console.log(id);
  }
}
