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
    status: string;
    duration: string;
    totalTimeSpent: string;
    approver: string; 
    created_by: string;
    created_on: Date;
    updated_by: string;
    updated_on: Date;
    approver_info: User;
    project_info: Project;
    vols_info: User[];
    activity_info: Activity[];
  }
  
  
  export interface Activity {
    _id: string;
    projectId: string;
    taskId: string;
    userId: string;
    userName: string;
    role: string;
    activity: string;
    timeEntered: string;
    status: string; 
    createdBy: string;
    createdOn: Date;
    updatedBy: string;
    updatedOn: Date;
  }
  
  export interface ProjectStatus {
    value: string;
    viewValue: string;
  }

  export interface Message {
    message: string;
  }
  
  export interface UserComment {
    userId: string;
    comment: string;
  }