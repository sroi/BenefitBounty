import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  private loggedInStatus=JSON.parse(localStorage.getItem('loggedIn')||'false');

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  correctDetails:boolean;
  roleName: any;
  roles: any = ['Admin', 'Approver', 'Volunteer', 'Stakeholder'];
  isUsernamePresent: boolean = false;
  isPasswordPresent: boolean = false;
  isUsernameEntered: boolean = false;
  isPasswordMatched: boolean = true;
  usernameFromLocalStorage: string;

  constructor(private httpClient:HttpClient, private router:Router) { 
    if(this.loggedInStatus)
    {
          this.router.navigate(['home']);
    }
  }

  ngOnInit() {

    // localStorage.clear();
    this.loginForm=new FormGroup({
      username: new FormControl(),
      password: new FormControl('',Validators.required),
      confirmPassword: new FormControl('',Validators.required)
    });

    this.usernameFromLocalStorage = localStorage.getItem("username");
    this.loginForm.patchValue({username:this.usernameFromLocalStorage});

  }
  get f() { return this.loginForm.controls; }

  changeRole(e) {
    this.roleName.setValue(e.target.value, {
      onlySelf: true
    })
  }


  loginUser() {
    let usernameFromLocal = localStorage.getItem("username");
    console.log("yes"+' '+usernameFromLocal);
    this.submitted = true;
    if(this.loginForm.get('password').value != this.loginForm.get('confirmPassword').value)
    {
      this.isPasswordMatched = false;
      return;
    }
    if (this.loginForm.invalid) {
      return;
    }
    
    if(this.loginForm.valid)
    {
      this.correctDetails=true;
      this.loginpost();
    
    }
  }

  checkUsername()
  {
    console.log(this.loginForm.get('username').value);
    this.isUsernameEntered = true;
    this.isUsernamePresent = true;
    this.isPasswordPresent = true;
  }


  loginpost(){
    let dataToSend = {
      username: this.loginForm.get('username').value,
      pass_word: this.loginForm.get('password').value,
      confirm_password: this.loginForm.get('confirmPassword').value
    }
    console.log(dataToSend.username+' '+dataToSend.pass_word+' '+dataToSend.confirm_password);

    let serializedForm = JSON.stringify(dataToSend);

    let h = new HttpHeaders({'Content-Type':'application/json'});

    this.router.navigate(['../login']);
   
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
