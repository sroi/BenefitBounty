import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { IMyDateModel, IMyDpOptions } from 'mydatepicker';
import { Project } from 'src/app/_models/model';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent implements OnInit {
  private formBuilder: FormBuilder;
  
  data: Project;
  addProjectForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
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
  ngOnInit(){
    this.formBuilder = new FormBuilder();
    this.addProjectForm = this.formBuilder.group({
      area: [''],
      budget:  [''],
      corporate:  [''],
      startDate:  [''],
      endDate:  [''],
      location:  [''],
      name:  [''],
      corpEntity:  [''],
      status: [''],
      stakeholderName: [''],
      stakeholderEmail: [''],
      stakeholderPhoneNo: [''],
      POCName: [''],
      POCEmail: [''],
      POCPhoneNo: [''],
      // termsAndConditions: [false, Validators.requiredTrue]
    });

  }
  public confirmAdd(): void {
    
    let dataToSend = {
      area : this.addProjectForm.get('area').value,
      budget : this.addProjectForm.get('budget').value,
      corporate : this.addProjectForm.get('corporate').value,
      startDate : this.addProjectForm.get('startDate').value,
      endDate : this.addProjectForm.get('endDate').value,
      budglocationet : this.addProjectForm.get('location').value,
      name : this.addProjectForm.get('name').value,
      corpEntity : this.addProjectForm.get('corpEntity').value,
      status : "Created",
      stakeholderName : this.addProjectForm.get('stakeholderName').value,
      stakeholderEmail : this.addProjectForm.get('stakeholderEmail').value,
      stakeholderPhoneNo : this.addProjectForm.get('stakeholderPhoneNo').value,
      POCName : this.addProjectForm.get('POCName').value,
      POCEmail : this.addProjectForm.get('POCEmail').value,
      POCPhoneNo : this.addProjectForm.get('POCPhoneNo').value,
    }
    
    this.dataService.addIssue(dataToSend);
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
