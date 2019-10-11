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
        { id: 1, stackholder: "Participants(students)", goalsOrOutcome: "Improve knowledge/Employment opportunities increased",indicators:"Learns new skills/Seeks employment",proxies:"Cost of the same training outside",monetoryValue:1000,source:"Reesearch across institutes"},
        { id: 2, stackholder: "Families", goalsOrOutcome: "Increase in household income",indicators:"Increase in Household Income",proxies:"Salary earned by parttime work of participant from ABC Bank",monetoryValue:5000,source:"confirmed pay scale by ABC bank"},
        { id: 3, stackholder: "BMC School", goalsOrOutcome: "Decrease in dropout rates due to chances of mployment opportunities",indicators:"Reduction in dropout",proxies:"Inc in fee collection due to less dropouts",monetoryValue:500,source:"School fee data"},
        { id: 4, stackholder: "Government", goalsOrOutcome: "Higher enrollment for further studies",indicators:"Higher enrollment for further studies",proxies:"Fees earned per student when they enroll",monetoryValue:2000,source:"College fee data"},
        { id: 5, stackholder: "ABC Bank", goalsOrOutcome: "Employee training by the particpants/IT skilled staff available",indicators:"Increase inIT skill of workforce",proxies:"One time staff training cost",monetoryValue:20000,source:"Training fee"},
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
