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