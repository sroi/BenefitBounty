import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AdminPrService } from './admin-pr.service';
//import { MustMatch } from '../shared/validators/must-match.validators';

@Component({
  selector: 'app-admin-pr',
  templateUrl: './admin-pr.component.html',
  styleUrls: ['./admin-pr.component.scss']
})
export class AdminPrComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private adminPrService:AdminPrService) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          project: ['', Validators.required],
          engageArea: ['', Validators.required],
          summary: ['', Validators.required],
          duration: ['', Validators.required],
          budget: ['', Validators.required],
          company: ['', Validators.required],
          location: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]]
        //   password: ['', [Validators.required, Validators.minLength(6)]],
        //   confirmPassword: ['', Validators.required]
      }, {
          //validator: MustMatch('password', 'confirmPassword')
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      console.log("clicked on onSubmit");
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.adminPrService.addProject(this.registerForm.value).subscribe(
        res => {
          return console.log(res);
        }
      );
      
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }
}
