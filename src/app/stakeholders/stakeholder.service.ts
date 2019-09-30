import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Projects } from '../project/project-list/project-list.component';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable()
export class StakeHolderService {
    projects: Array<any> = [];
    currentTasks: Array<any> = [];
    projectsLoadedEvent: Subject<Array<any>> = new Subject<Array<any>>();
    tasksloadedEvent: Subject<Array<any>> = new Subject<Array<any>>();
    constructor(private http: HttpClient, private datePipe: DatePipe) {

    }
    fetchProjects() {
        this.http.get<Projects[]>('http://localhost:8080/project/all')
            .pipe(
                map( projects => {
                return projects.map( project => {
                    const {startDate, endDate} = project;
                    const duration: string = this.datePipe.transform(startDate, 'dd/MM/yyyy') 
                    + ' - ' + this.datePipe.transform(endDate, 'dd/MM/yyyy');
                    return { ...project, 'duration': duration, rating: 3, isApproved: false};
                });
                })
            )
            .subscribe(data => {
                this.projects = data;
                this.projectsLoadedEvent.next(this.projects);
            });
    }
    getProjects() {
        return this.projects;
    }
    getProject(projectId: string) {
        // return this.projects.filter(project => {
        //     return projectId === project['projectId'];
        // })[0];
        return this.http.get<any>('http://localhost:8080/project/get', {
            params: new HttpParams().set('pid', projectId) 
          });
    }
    fetchTasks(projectId: string) {
        this.http.get<any>('http://localhost:8080/project/tasks', {
          params: new HttpParams().set('pid', projectId) 
        }).subscribe(tasks => {
            this.currentTasks = tasks;
            this.tasksloadedEvent.next(this.currentTasks);
        }, error => {

        });
    }
    deleteTask(task: any) {
        this.http.delete(
            'http://localhost:8080/project/deleteTask',
            { params: new HttpParams().set('tid', task.taskId)}
        ).subscribe(data => {
            this.fetchTasks(task.projectId);
        });
    }
}