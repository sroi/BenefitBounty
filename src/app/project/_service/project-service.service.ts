import { Injectable } from '@angular/core';
import { Project } from '../_model';
import { Observable } from 'rxjs';


import {  HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  constructor(private _httpClient:HttpClient) { }
  private baseUrl:string="http://localhost:56967/api";//"http://10.254.5.241:90/api";//this.config.getConfiguration().apiUrl;//
  private Paramlist:string=this.baseUrl+"/Parameter/GetParameterSets";
  private ParamuploadFile:string=this.baseUrl+"/Parameter/UploadFile";

postProject(formData:FormData):Observable<Project>
{
  return this._httpClient.post<Project>(this.ParamuploadFile,formData);
 
    //catch(this.handleError<ResultResponse>());
}

arrJson: any=[];
keys: any=[];

fetchProjects()
  {
    this._httpClient.get('http://localhost:8080/projects').subscribe(
      data => {
        this.arrJson = data;
        for(const key in this.arrJson[0])
        {
          if(key != null)
          {
            this.keys.push(key);
          }
        }
      },
      (err: HttpErrorResponse) => {
        console.log();
      }
    )
  }

  

}
