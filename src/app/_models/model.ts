  export interface User {
    _id: string;
    userId: string;  
    name: string;
    email: string;
    phoneNo: number;
    role: string;
  }

  export interface Project {
    _id: string;
    name: string;
    summary: string;
  }
  
  export interface Task {
    activityLabel: string;
    taskId: string;
    name: string;
    description: string;
    projectId: string;
    startDate: Date;
    endDate: Date;
    location: string;
    approver: string; 
    created_by: string;
    created_on: Date;
    updated_by: string;
    updated_on: Date;
    approver_info: User;
    project_info: Project;
    vols_info: User[];
  }
  
  
  export interface Activity {
    activityId: object;
    projectId: string;
    taskId: string;
    userId: string;
    role: string;
    activity: string;
    comments: string;
    uploads: string;
    timeEntered: string; 
    createdBy: string;
    createdTime: Date;
    updatedBy: string;
    updatedTime: Date;
  }
  
  export interface ProjectStatus {
    value: string;
    viewValue: string;
  }
  
  export interface UserComment {
    userId: string;
    comment: string;
  }