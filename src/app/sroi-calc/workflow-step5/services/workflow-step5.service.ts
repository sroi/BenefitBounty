import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NetPresentValue } from '../../models/net-present-value';

@Injectable({
  providedIn: 'root'
})
export class WorkflowStep5Service {

  constructor(private httpClient: HttpClient) { } 
  dataChange: BehaviorSubject<NetPresentValue[]> = new BehaviorSubject<NetPresentValue[]>([]);
  dialogData: any;

  get data(): NetPresentValue[] {
      return this.dataChange.value;
  }

  getDialogData() {
      return this.dialogData;
  }

  getNetPresentValue(): void {

      // observable execution
      this.dataChange.next([
          { id: 1, deadweight: 0, attribution: 0,displacement:0,dropoff:0},
      ])

  }

  // DEMO ONLY, you can find working methods below
  addIssue(issue: NetPresentValue): void {
      this.dialogData = issue;
  }

  updateIssue(issue: NetPresentValue): void {
      this.dialogData = issue;
  }

  deleteIssue(id: number): void {
      console.log(id);
  }
}
