import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable() 
export class CommonService {
    roleChanged: Subject<string> = new Subject<string>();
}