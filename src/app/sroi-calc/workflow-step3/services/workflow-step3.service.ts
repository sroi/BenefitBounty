import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ImpactMap } from '../../models/impact-map';

@Injectable({
  providedIn: 'root'
})
export class WorkflowStep3Service {

  constructor(private httpClient: HttpClient) { } 
  dataChange: BehaviorSubject<ImpactMap[]> = new BehaviorSubject<ImpactMap[]>([]);
  dialogData: any;

  get data(): ImpactMap[] {
      return this.dataChange.value;
  }

  getDialogData() {
      return this.dialogData;
  }

  getImpactMap(): void {

      // observable execution
      this.dataChange.next([
          { id: 1, stackholder: "stackholder 1", goalsOrOutcome: "goalsOrOutcome 1",indicators:"indicators 1",proxies:"proxies 1",monetoryValue:10,source:"source 1"},
          { id: 2, stackholder: "stackholder 2", goalsOrOutcome: "goalsOrOutcome 2",indicators:"indicators 2",proxies:"proxies 2",monetoryValue:20,source:"source 2"},
          { id: 3, stackholder: "stackholder 3", goalsOrOutcome: "goalsOrOutcome 3",indicators:"indicators 3",proxies:"proxies 3",monetoryValue:30,source:"source 3"},
          { id: 4, stackholder: "stackholder 4", goalsOrOutcome: "goalsOrOutcome 4",indicators:"indicators 4",proxies:"proxies 4",monetoryValue:40,source:"source 4"},
          { id: 5, stackholder: "stackholder 5", goalsOrOutcome: "goalsOrOutcome 5",indicators:"indicators 5",proxies:"proxies 5",monetoryValue:50,source:"source 5"},
      ])

  }

  // DEMO ONLY, you can find working methods below
  addIssue(issue: ImpactMap): void {
      this.dialogData = issue;
  }

  updateIssue(issue: ImpactMap): void {
      this.dialogData = issue;
  }

  deleteIssue(id: number): void {
      console.log(id);
  }
}
