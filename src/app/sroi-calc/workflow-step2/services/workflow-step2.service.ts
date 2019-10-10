import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Stackholder } from '../../models/stackholder';

@Injectable({
  providedIn: 'root'
})
export class WorkflowStep2Service {

  constructor(private httpClient: HttpClient) { } 
  dataChange: BehaviorSubject<Stackholder[]> = new BehaviorSubject<Stackholder[]>([]);
  dialogData: any;

  get data(): Stackholder[] {
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

  getStackholders(): void {

      // observable execution
      this.dataChange.next([
          { id: 1, stackholder: "stackholder 1", goalsOrOutcome: "goalsOrOutcome 1"},
          { id: 2, stackholder: "stackholder 2", goalsOrOutcome: "goalsOrOutcome 2" },
          { id: 3, stackholder: "stackholder 3", goalsOrOutcome: "goalsOrOutcome 3" }
      ])

  }

  // DEMO ONLY, you can find working methods below
  addIssue(issue: Stackholder): void {
      this.dialogData = issue;
  }

  updateIssue(issue: Stackholder): void {
      this.dialogData = issue;
  }

  deleteIssue(id: number): void {
      console.log(id);
  }
}
