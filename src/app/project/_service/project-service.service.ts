import { Injectable } from '@angular/core';
import { Project } from '../_model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  constructor() { }
  private baseUrl:string="http://localhost:56967/api";//"http://10.254.5.241:90/api";//this.config.getConfiguration().apiUrl;//
  private Paramlist:string=this.baseUrl+"/Parameter/GetParameterSets";
  private ParamuploadFile:string=this.baseUrl+"/Parameter/UploadFile";

  postProject(project:Project):Observable<Project>
  {
    return ;
  }
}
