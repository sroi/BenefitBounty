import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import {Issue, Projects} from '../../models/issue';
import { IMyDateModel, IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Projects,
              public dataService: DataService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dataService.updateIssue(this.data);
  }


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


}
