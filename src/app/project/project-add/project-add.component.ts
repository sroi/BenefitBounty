import { Component, OnInit } from '@angular/core';
import { Project} from '../_model';
import { NgForm } from '@angular/forms';
import { ProjectServiceService } from '../_service/project-service.service';
import { resource } from 'selenium-webdriver/http';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {
  project:Project= new Project();
  constructor(private projectService:ProjectServiceService) { }

  ngOnInit() {
  }
  submitted=false;
  onSubmit(form:NgForm) { 
    console.log('in submit', form.valid);
    console.log(  (this.project.area_Engagement) );
  this.projectService.postProject(this.project).subscribe(
    result=>console.log('success'),
    error=>console.log('error:',error)
  );
  }

  // TODO: Remove this when we're done
 // get diagnostic() { return JSON.stringify(this.model); }
}
