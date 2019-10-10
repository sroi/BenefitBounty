import  {ContactPersons} from './contact-persons';
export interface User {
    _id: string;
    userId: string;  
    name: string;
    email: string;
    phoneNo: number;
    role: string;
  }
export class Project 
{
    ProjectId: string;
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
    stakeholderList: User[];
    pointOfContactUserList: User[];
    corporate: string;
}
