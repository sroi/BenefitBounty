//import { TaskList1Component } from 'src/app/approver/task-list/task-list.component';
import { Tasks } from '../project-list/project-list.component';

export class Task implements Tasks{
    activityLabel: string;    taskId: string;
    name: string;
    description: string;
    projectId: string;
    startDate: Date;
    endDate: Date;
    location: string;
    approver: import("../project-list/project-list.component").Approver;
    volunteers: import("../project-list/project-list.component").Volunteers[];
    createdBy: string;
    createdTime: Date;
    updatedBy: string;
    updatedTime: Date;

}
