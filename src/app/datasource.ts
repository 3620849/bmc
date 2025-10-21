export interface Patient {
  Id:number;
  Status:string;
  Summary:string;
  Type:string;
  Priority:string;
  Tags:string;
  Estimate:number;
  Assignee:string;
  RankId:number;
}
export let kanbanData: Patient[] = [
  {
    Id: 1,
    Status: 'Emergency',
    Summary: 'Analyze the new requirements gathered from the customer.',
    Type: 'Story',
    Priority: 'Low',
    Tags: 'Analyze,Customer',
    Estimate: 3.5,
    Assignee: 'Nancy Davloio',
    RankId: 1
  },
  {
    Id: 2,
    Status: 'ICU',
    Summary: 'Improve application performance',
    Type: 'Improvement',
    Priority: 'Normal',
    Tags: 'Improvement',
    Estimate: 6,
    Assignee: 'Andrew Fuller',
    RankId: 1
  },
  {
    Id: 3,
    Status: 'ICU',
    Summary: 'Improve application performance',
    Type: 'Improvement',
    Priority: 'Normal',
    Tags: 'Improvement',
    Estimate: 6,
    Assignee: 'Andrew Fuller',
    RankId: 1
  },
  {
    Id: 4,
    Status: 'General Ward',
    Summary: 'Improve application performance',
    Type: 'Improvement',
    Priority: 'Normal',
    Tags: 'Improvement',
    Estimate: 6,
    Assignee: 'Andrew Fuller',
    RankId: 1
  }
];
