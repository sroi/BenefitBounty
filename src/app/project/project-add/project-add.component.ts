import { Component, OnInit } from '@angular/core';
import { Project} from '../_model';
import { NgForm, FormsModule } from '@angular/forms';
import { ProjectServiceService } from '../_service/project-service.service';
import { resource } from 'selenium-webdriver/http';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { ContactPersons } from '../_model/contact-persons';
@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})

export class ProjectAddComponent implements OnInit {
  date:Date=new Date();
  public project= new Project();
  
   //= { date: { year: this.date.getFullYear(), month:  this.date.getMonth()+1, day:  this.date.getDate() } };
 
  constructor(private _projectService:ProjectServiceService) {
   //this.project.startDate= new Date(Date.now.toString());
   //this.project.endDate= new Date(Date.now.toString());
   
    }

  ngOnInit() {
    this.project.stakeHolders=new ContactPersons()[0];
  }
  public myDatePickerStartOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
};

public myDatePickerEndOptions: IMyDpOptions = {
  // other options...
  dateFormat: 'dd/mm/yyyy',

};
  onSubmit(form:NgForm) { 
   
    console.log( form.value );

    
  this._projectService.postProject(form.value).subscribe(
    (response:Project)=>{
      debugger
      console.log(JSON.stringify("success"+response));
      
    },
    
    err=>{
      if(err.status == 400){
      console.log( JSON.parse( JSON.stringify(err.error )));}
    });
  }

  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    this.project.startDate= event.jsdate;
   this.restrictpastDate();
  }

  onEndDateChanged(event:IMyDateModel)
  {
    this.project.endDate=event.jsdate;

  }

  addStakeHolders()
  {
    this.project.stakeHolders.push(new ContactPersons());
  }
 removeStakeHolders()
  {
    this.project.stakeHolders.pop();
  }
  private getCopyOfOptions(): IMyDpOptions {
    return JSON.parse(JSON.stringify(this.myDatePickerStartOptions));
    }

    private restrictpastDate()
    {
      let date = new Date();

    // Disable/enable dates from 5th backward
    date.setDate(this.project.startDate.getDate() - 1);

    let copy = this.getCopyOfOptions();
    copy.disableUntil = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()} ;
    this.myDatePickerEndOptions = copy;

    }

 
  
}
