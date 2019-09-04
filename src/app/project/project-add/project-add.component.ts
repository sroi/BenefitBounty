import { Component, OnInit } from '@angular/core';
import { Project} from '../_model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {
  project:Project= new Project();
  constructor() { }

  ngOnInit() {
  }
  submitted=false;
  onSubmit(form:NgForm) { 
    console.log('in submit', form.valid);
    console.log(  (this.project.area_Engagement) );}

  // TODO: Remove this when we're done
 // get diagnostic() { return JSON.stringify(this.model); }
}
