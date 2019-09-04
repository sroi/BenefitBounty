import  {ContactPersons} from './contact-persons';
export class Project {
projectName:string;
area_Engagement:string;
summary:string;
startDate:Date;
endDate:Date;
budget_estimate:number;
corporate_Assosciate:string;
location:string;
contactPerson:ContactPersons[];
stakeHolders:ContactPersons[];
}
