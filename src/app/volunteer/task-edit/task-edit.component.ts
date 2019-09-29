import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';



export interface Volunteers {
  name: string;
  emailId: string;
  phoneNo: number;
  role: string;
}

export interface Approver {
  name: string;
  emailId: string;
  phoneNo: number;
  role: string;
}

export interface Tasks {
  activityLabel: string;
  taskId: string;
  name: string;
  description: string;
  projectId: string;
  startDate: Date;
  endDate: Date;
  location: string;
  approver: Approver;
  volunteers: Volunteers[];
  createdBy: string;
  createdTime: Date;
  updatedBy: string;
  updatedTime: Date;
}

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})

export class TaskEditComponent implements OnInit {
  private loggedInStatus=JSON.parse(localStorage.getItem('loggedIn')||'false');

  loginForm: FormGroup;
  taskForm: FormGroup;
  loading = false;
  submitted = false;
  correctDetails:boolean;
  roleName: any;
  roles: any = ['Admin', 'Approver', 'Volunteer', 'Stakeholder'];
  isUsernamePresent: boolean = false;
  isPasswordPresent: boolean = false;
  isUsernameEntered: boolean = false;
  currentTask: Tasks;

  constructor(private httpClient:HttpClient, private router:Router) { 
    if(this.loggedInStatus)
    {
          this.router.navigate(['home']);
    }
  }

  ngOnInit() {

    this.currentTask = JSON.parse(localStorage.getItem('currentTask'));
    console.log(this.currentTask.name);
    var newApprover = JSON.stringify(this.currentTask.approver);
    newApprover = JSON.parse(newApprover);
    //newApprover = JSON.parse(newApprover);
    console.log(newApprover);
    
    
    // localStorage.clear();
    this.loginForm=new FormGroup({
      username: new FormControl({value: this.currentTask.activityLabel, disabled: true},Validators.required),
      password: new FormControl('',Validators.required),
      roleName: new FormControl('',Validators.required)
    });
    this.taskForm = new FormGroup({
      activity: new FormControl({value: this.currentTask.activityLabel, disabled: true},Validators.required),
      area: new FormControl({value: this.currentTask.description, disabled: true},Validators.required),
      task: new FormControl({value: this.currentTask.name, disabled: true},Validators.required),
      startDate: new FormControl({value: this.currentTask.startDate, disabled: true},Validators.required),
      endDate: new FormControl({value: this.currentTask.endDate, disabled: true},Validators.required),
      approver: new FormControl({value: newApprover, disabled: true},Validators.required),
      volunteerComments: new FormControl('',Validators.required),
      timeEntered: new FormControl('',Validators.required),
      uploads: new FormControl('',Validators.required),
    });
    this.setFields();
    

  }
  setFields()
  {
    this.loginForm.patchValue({activity:this.currentTask.activityLabel});
    this.loginForm.patchValue({area:this.currentTask.createdBy});
    this.loginForm.patchValue({task:this.currentTask.name});
    this.loginForm.patchValue({startDate:this.currentTask.startDate});
    this.loginForm.patchValue({endDate:this.currentTask.endDate});
    this.loginForm.patchValue({approver:this.currentTask.approver[0].name});
  }
  get f() { return this.taskForm.controls; }

  changeRole(e) {
    this.roleName.setValue(e.target.value, {
      onlySelf: true
    })
  }


  updateTasks() {
    console.log("yes");
    this.submitted = true;
    if (this.taskForm.invalid) {
      return;
    }
    
    if(this.taskForm.valid)
    {
      this.correctDetails=true;
      this.loginpost();
    
    }
  }

  checkUsername()
  {
    console.log(this.taskForm.get('username').value);
    this.isUsernameEntered = true;
    this.isUsernamePresent = true;
    this.isPasswordPresent = false;
    localStorage.setItem("username",this.taskForm.get('username').value);
    if(this.isUsernameEntered && this.isUsernamePresent && !this.isPasswordPresent)
    {
      this.router.navigate(['../signup']);
    }
    if(this.isUsernameEntered && !this.isUsernamePresent)
    {
      console.log("Username not present");
    }
  }


  loginpost(){
    let dataToSend = {
      activity: this.taskForm.get('activity').value,
      area: this.taskForm.get('area').value,
      task: this.taskForm.get('task').value,
      startDate: this.taskForm.get('startDate').value,
      endDate: this.taskForm.get('endDate').value,
      approver: this.taskForm.get('approver').value,
      volunteerComments: this.taskForm.get('volunteerComments').value,
      timeEntered: this.taskForm.get('timeEntered').value,
      uploads: this.taskForm.get('uploads').value

    }
    
    let serializedForm = JSON.stringify(dataToSend);

    let h = new HttpHeaders({'Content-Type':'application/json'});

    this.router.navigate(['../task']);
   
    // this.httpClient.post("http://localhost:8080/login",serializedForm,{headers:h})
    // .subscribe(
    //   data  => { if(data)
    //               {
    //               localStorage.setItem('loggedIn', JSON.stringify(data)); 
    //               this.router.navigate(['/home']);
    //               // this.ngOnInit();
    //               location.reload();
    //               }
    //               else
    //               {
    //                 this.correctDetails=false;
    //                 console.log("error");
    //               }

    //   },
    //   error  => {console.log("Error", error);}
    // )
  }

}
