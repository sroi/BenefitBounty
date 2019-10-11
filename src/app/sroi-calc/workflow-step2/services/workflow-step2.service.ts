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
        { id: 1, stackholder: "Participants(students)", goalsOrOutcome: "Improve knowledge/Employment opportunities increased"},
        { id: 2, stackholder: "Families", goalsOrOutcome: "Increase in household income" },
        { id: 3, stackholder: "BMC School", goalsOrOutcome: "Decrease in dropout rates due to chances of mployment opportunities" },
        { id: 4, stackholder: "Government", goalsOrOutcome: "Higher enrollment for further studies" },
        { id: 5, stackholder: "ABC Bank", goalsOrOutcome: "Employee training by the particpants/IT skilled staff available" }
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
