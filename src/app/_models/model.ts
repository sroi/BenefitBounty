  export interface User {
    id: string;
    _id: string;
    userId: string;  
    name: string;
    email: string;
    details: string;
    phoneNo: string;
    role: string;
    admin:string;
    stakeholder: string;
    approver: string;
    volunteer: string;
  }
 
  export interface Comment {
    userId: string;
    comment: string;
    projectId: string;
    status: string;
  }
  export interface UserTO {
    _id: string;
    phoneNo: string;  
    name: string;
    email: string;
  }

  export interface Project {
    id: string;
    projectId: string;
    name: string;
    areaOfEngagement: string;
    summary: string;
    startDate: Date;
    endDate: Date;
    budget: number;
    location: string;
    status: string;
    rating: number;
    createdOn: Date;
    createdBy: string;
    updatedOn: Date;
    updatedBy: string;
    admin: User;
    stakeholder: UserTO;
    stakeholderList: User[];
    pointOfContact: UserTO;
    pointOfContactUserList: User[];
    corporate: string;
  }

  export interface image {
    name: string;
    url: string;
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
    approver_info: UserTO;
    project_info: Project;
    vols_info: UserTO[];
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