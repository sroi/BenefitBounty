import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loggedInStatus=JSON.parse(localStorage.getItem('loggedIn')||'false');

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  correctDetails:boolean;
  roleName: any;
  roles: any = ['Admin', 'Approver', 'Volunteer', 'Stakeholder']

  constructor(private httpClient:HttpClient, private router:Router) { 
    if(this.loggedInStatus)
    {
          this.router.navigate(['home']);
    }
  }

  ngOnInit() {

    // localStorage.clear();
    this.loginForm=new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      roleName: new FormControl('',Validators.required)
    });


  }
  get f() { return this.loginForm.controls; }

  changeRole(e) {
    this.roleName.setValue(e.target.value, {
      onlySelf: true
    })
  }


  loginUser() {
    console.log("yes");
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    
    if(this.loginForm.valid)
    {
      this.correctDetails=true;
      this.loginpost();
    
    }
  }


  loginpost(){
    let dataToSend = {
      username: this.loginForm.get('username').value,
      pass_word: this.loginForm.get('password').value,
      role: this.loginForm.get('roleName').value
    }
    console.log(dataToSend.username+' '+dataToSend.pass_word+' '+dataToSend.role);

    let serializedForm = JSON.stringify(dataToSend);

    let h = new HttpHeaders({'Content-Type':'application/json'});

    this.router.navigate(['../project']);
   
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