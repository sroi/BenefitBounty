import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Task, UserTO } from 'src/app/_models/model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  
  private formBuilder: FormBuilder;
  addTaskForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
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
      console.log(this.data.projectId)
      this.formBuilder = new FormBuilder();
      this.addTaskForm = this.formBuilder.group({
        name: [''],
        activityLabel: [''],
        description:[''],
        startDate:[''],
        endDate: [''],
        location:[''],
        approverId:[''],
        approverName: [''],
        approverEmail:  [''],
        approverPhoneNo:  [''],
        volunteerId: [''],
        volunteerName: [''],
        volunteerEmail:  [''],
        volunteerPhoneNo:  [''],
     
    });
    this.addTaskForm.patchValue({approverId:null});
    this.addTaskForm.patchValue({volunteerId:null});
    }
  
    public confirmAdd(): void {
      let approver : UserTO = {
        _id: this.addTaskForm.get('approverId').value,
        name: this.addTaskForm.get('approverName').value,
        email: this.addTaskForm.get('approverEmail').value,
        phoneNo: this.addTaskForm.get('approverPhoneNo').value
      
      }
  
      let volunteer: UserTO = {
        _id : this.addTaskForm.get('volunteerId').value,
        name : this.addTaskForm.get('volunteerName').value,
        email : this.addTaskForm.get('volunteerEmail').value,
        phoneNo : this.addTaskForm.get('volunteerPhoneNo').value
      }

      let vols_infoNew: UserTO[] = [volunteer];

      let dataToSend = {
        projectId: this.data.projectId,
        name : this.addTaskForm.get('name').value,
        activityLabel : this.addTaskForm.get('activityLabel').value,
        description : this.addTaskForm.get('description').value,
        startDate : this.addTaskForm.get('startDate').value,
        endDate : this.addTaskForm.get('endDate').value,
        location : this.addTaskForm.get('location').value,
        approver_info : approver,
        vols_info : vols_infoNew
        
      }

      this.dataService.addTask(dataToSend);
    }
  }

