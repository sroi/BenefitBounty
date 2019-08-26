import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-comp',
  templateUrl: './login-comp.component.html',
  styleUrls: ['./login-comp.component.scss']
})
export class LoginCompComponent implements OnInit {
  [x: string]: any;

  private loggedInStatus=JSON.parse(localStorage.getItem('loggedIn')||'false');

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  correctDetails:boolean;

  constructor() {

    if(this.loggedInStatus)
    {
          this.router.navigate(['/']);
    }

   }

  ngOnInit() {
    this.loginForm=new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    });
  }

  get f() { return this.loginForm.controls; }


  loginUser() {
    
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

  loginpost()
  {
    let dataToSend = {
      username: this.loginForm.get('username').value,
      pass_word: this.loginForm.get('password').value
    }
    alert(dataToSend.username);
    this.router.navigate(['/']);
  }

}
