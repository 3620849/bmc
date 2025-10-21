export interface Patient {
  Id:number;
  Name:string;
  Status: 'Emergency'|'ICU'|'General Ward'|'Outpatient'|'Radiology',
  PatientStatus:'Admission'|'In Treatment'| 'Waiting'| 'Discharged'| 'Critical'
  Summary:string;
  Priority:'Critical'| 'Urgent'| 'Standard'| 'Routine';
  Records:[],
  Doctor:number
  Bed:number;
}
export let kanbanData: Patient[] = [
  {
    Id: 1,
    Name:'John Dow',
    Status: 'Emergency',
    PatientStatus:'Admission',
    Summary: 'Analyze the new requirements gathered from the customer.',
    Priority: 'Critical',
    Records:[],
    Doctor:1,
    Bed:1,
  },
  {
    Id: 2,
    Name:'John Dow',
    Status: 'ICU',
    PatientStatus:'Waiting',
    Summary: 'Analyze the new requirements gathered from the customer.',
    Priority: 'Critical',
    Records:[],
    Doctor:1,
    Bed:1,
  },
  {
    Id: 3,
    Name:'John Dow',
    Status: 'General Ward',
    PatientStatus:'Discharged',
    Summary: 'Analyze the new requirements gathered from the customer.',
    Priority: 'Critical',
    Records:[],
    Doctor:1,
    Bed:1,
  }
];

