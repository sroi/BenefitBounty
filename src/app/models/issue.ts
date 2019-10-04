export class Issue {
  id: number;
  title: string;
  state: string;
  url: string;
  created_at: string;
  updated_at: string;
}


export interface PointOfContacts {
  name: string;
  phoneNo: number;
  emailId: string;
  role: string;
}

export interface Stakeholders {
  name: string;
  phoneNo: number;
  emailId: string;
  role: string;
}

export interface Projects {
  projectId: string;
  name: string;
  areaOfEngagement: string;
  corporate: string;
  budget: number;
  status: string;
  endDate: Date;
  startDate: Date;
  location: string;
  pointOfContacts: PointOfContacts[];
  stakeholders: Stakeholders[];
  summary: string;

}

export interface Volunteers {
  name: string;
  emailId: string;
  phoneNo: number;
  role: string;
}

export interface Approver {
  name: string;
  emailId: string;
  phoneNo: number;
  role: string;
}

export interface Tasks {
  activityLabel: string;
  taskId: string;
  name: string;
  description: string;
  projectId: string;
  startDate: Date;
  endDate: Date;
  location: string;
  approver: Approver;
  volunteers: Volunteers[];
  createdBy: string;
  createdTime: Date;
  updatedBy: string;
  updatedTime: Date;
}

export interface Comment {
  userId: string;
  comment: string;
  projectId: string;
}