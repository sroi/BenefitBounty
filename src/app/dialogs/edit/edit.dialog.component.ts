import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import { IMyDateModel, IMyDpOptions } from 'mydatepicker';
// import  * as momentfrom 'moment';
// import 'moment/locale/pt-br';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }
            
    isStakeholder: boolean = false;
    isPOC: boolean = false;

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  public myDatePickerStartOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };

  public myDatePickerEndOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',

  };
  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    this.data.startDate = event.jsdate;
    this.restrictpastDate();
  }
  private getCopyOfOptions(): IMyDpOptions {
    return JSON.parse(JSON.stringify(this.myDatePickerStartOptions));
  }

  private restrictpastDate() {
    let date = new Date();

    // Disable/enable dates from 5th backward
    date.setDate(this.data.startDate.getDate() - 1);

    let copy = this.getCopyOfOptions();
    copy.disableUntil = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    this.myDatePickerEndOptions = copy;

  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  checkStakeholder()
  {
    if(this.data.stakeholderList != null)
    {
      this.isStakeholder = true;
    }
    return this.isStakeholder;
  }

  checkPOC()
  {
    if(this.data.pointOfContactUserList != null)
    {
      this.isPOC = true;
    }
    return this.isPOC;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.updateIssue(this.data);
  }
}
