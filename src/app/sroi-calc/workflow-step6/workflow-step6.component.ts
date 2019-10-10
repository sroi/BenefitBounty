import { Component, OnInit } from '@angular/core';
import { NetInvestment } from '../models/net-investment';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-workflow-step6',
  templateUrl: './workflow-step6.component.html',
  styleUrls: ['./workflow-step6.component.scss']
})
export class WorkflowStep6Component implements OnInit {
  data: NetInvestment = {netInvestmentNumber:0}
  investmentFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder) { }

  formControl = new FormControl('', [
    Validators.required
    ]);

    getErrorMessage() {
      return this.formControl.hasError('required') ? 'Required field' :
      '';
      }
    

  ngOnInit() {
  }
}
