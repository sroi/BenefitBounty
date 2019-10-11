import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-newlogin',
  templateUrl: './newlogin.component.html',
  styleUrls: ['./newlogin.component.scss']
})
export class NewloginComponent implements OnInit {

loginForm : FormGroup;
emailControl: FormControl;
username: string;
password: string;
returnUrl: string;
loading = false;
submitted = false;
  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  login() : void {
    // if(this.username == 'admin' && this.password == 'admin'){
    //   console.log("logging in...");
    //  this.router.navigate(["admin"]);
    // }else {
    //   alert("Invalid credentials");
    // }
    let proj = {
      username : this.username,
      password : this.password
    }

    this.httpClient.post('http://localhost:8080/login/auth',proj).subscribe(
      data => {
       //console.log("updated"+ ' ' + proj.ProjectId); 
       //this.showMessage("Project added successfully");

       console.log("logging in...");
     this.router.navigate(["admin"]);
      },
      err => {
        alert("Invalid credentials");
        this.router.navigate(["newlogin"]);
      }
    );

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
