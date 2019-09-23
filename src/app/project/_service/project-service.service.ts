import { Injectable } from '@angular/core';
import { Project } from '../_model';
import { Observable } from 'rxjs';


import {  HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  constructor(private _httpClient:HttpClient) { }
  private baseUrl:string="http://localhost:8080";
  private projectAddUpdate:string=this.baseUrl+"/project/create";
  

postProject(formData:FormData):Observable<Project>
{
  this.projectAddUpdate = this.projectAddUpdate+'/'+formData;
  return this._httpClient.post<Project>(this.projectAddUpdate,formData);
 
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

  getProjectById(id:number):Observable<Project>
  {
    const projectAddUpdate= `${this.projectAddUpdate}?id=${id}`;
    
    return this._httpClient.get<Project>(this.projectAddUpdate);
   
  } 
  
  
  

}
