import { Component, OnInit } from '@angular/core';
import { Project } from '../_model';
import { NgForm, FormsModule } from '@angular/forms';
import { ProjectServiceService } from '../_service/project-service.service';
import { resource } from 'selenium-webdriver/http';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { ContactPersons } from '../_model/contact-persons';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})

export class ProjectAddComponent implements OnInit {
  date: Date = new Date();
  public project = new Project();
  public isContactButtonVisible = false;
  public isStakeHolderButtonVisible = false;
  constructor(private _projectService: ProjectServiceService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.project.startDate = new Date(Date.now.toString());
   // this.project.stakeHolders = [];
    //this.project.contactPerson = [];

    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getProjectById(id);
    });
    
    let currentProject = localStorage.getItem("currentProject");
    console.log("Edit"+' '+currentProject);

  }

  public myDatePickerStartOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };

  public myDatePickerEndOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',

  };
  onSubmit(form: NgForm) {

    console.log(form.value);
    this._projectService.postProject(form.value).subscribe(
      (response: Project) => {
        debugger
        console.log(JSON.stringify("success" + response));
      },
      err => {
        if (err.status == 400) {
          console.log(JSON.parse(JSON.stringify(err.error)));
        }
      });


  }

  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    this.project.startDate = event.jsdate;
    this.restrictpastDate();
  }

  onEndDateChanged(event: IMyDateModel) {
    this.project.endDate = event.jsdate;

  }

  // addStakeHolders() {
  //   this.isStakeHolderButtonVisible = true;
  //   this.project.stakeHolders.push(new ContactPersons());
  // }
  // removeStakeHolders() {
  //   this.project.stakeHolders.pop();
  // }
  // addContactPersons() {
  //   this.isContactButtonVisible = true;
  //   this.project.contactPerson.push(new ContactPersons());
  // }

  // removeContactPersons() {
  //   this.project.contactPerson.pop();
  // }
  private getCopyOfOptions(): IMyDpOptions {
    return JSON.parse(JSON.stringify(this.myDatePickerStartOptions));
  }

  private restrictpastDate() {
    let date = new Date();

    // Disable/enable dates from 5th backward
    date.setDate(this.project.startDate.getDate() - 1);

    let copy = this.getCopyOfOptions();
    copy.disableUntil = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    this.myDatePickerEndOptions = copy;

  }

  getProjectById(id: number) {
    console.log(id);
    return this._projectService.getProjectById(id).subscribe(
      (response: Project) => {
        this.project.project_Name = response.project_Name;
        this.project.area_Engagement = response.area_Engagement;
        this.project.corporate_Assosciate = response.corporate_Assosciate;
        this.project.budget_estimate = response.budget_estimate;
        this.project.location = response.location;
        this.project.project_id = response.project_id;
        this.project.startDate = response.startDate;
        this.project.endDate = response.endDate;
        this.project.summary = response.summary;
        this.project.stakeHolders = response.stakeHolders;
     //   this.project.contactPerson = response.contactPerson;
      },

      err => {
        if (err.status == 400) {
          console.log(JSON.parse(JSON.stringify(err.error)));
        }
      });

  }

}
