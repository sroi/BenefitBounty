import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Projects } from '../project/project-list/project-list.component';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable()
export class StakeHolderService {
    projects: Array<any> = [];
    projectsLoadedEvent: Subject<Array<any>> = new Subject<Array<any>>()
    constructor(private http: HttpClient, private datePipe: DatePipe) {
        this.http.get<Projects[]>('http://192.168.43.91:8080/project/all')
        .pipe(
            map( projects => {
            return projects.map( project => {
                const {startDate, endDate} = project;
                const duration: string = this.datePipe.transform(startDate, 'dd/MM/yyyy') 
                + ' - ' + this.datePipe.transform(endDate, 'dd/MM/yyyy');
                return { ...project, 'duration': duration, rating: 3};
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
        return this.projects.filter(project => {
            return projectId === project['projectId'];
        })[0];
    }
}