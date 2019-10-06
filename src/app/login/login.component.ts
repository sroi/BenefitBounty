import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material'
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm : FormGroup;
emailControl: FormControl;
username: string;
password: string;
returnUrl: string;
loading = false;
    submitted = false;
 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    }
  }

  
  createFormGroup() {
    return new FormGroup({password: new FormControl('',Validators.email)});
  }

  getErrorMessage() {
    return this.emailControl.hasError('password') ? 'Not valid email' : '';
  }
  ngOnInit() {
    // this.emailControl = new FormControl('', [Validators.email]);
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() : void {
    if(this.username == 'admin' && this.password == 'admin'){
      console.log("logging in...");
     this.router.navigate(["user"]);
    }else {
      alert("Invalid credentials");
    }

    this.submitted = true;
    // this.authenticationService.login(this.username, this.password)
    //         .pipe(first())
    //         .subscribe(
    //             data => {
    //                 this.router.navigate([this.returnUrl]);
    //             },
    //             error => {
    //                 this.alertService.error(error);
    //                 this.loading = false;
    //             });
  }
  
}
