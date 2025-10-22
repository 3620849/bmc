import {Component, effect, inject} from '@angular/core';
import { loadAccumulationChartTheme } from '../theme-colors';
import {DonutChartComponent} from './donut-chart/donut-chart.component';
import {PatientStore} from '../shared/store/patient.store';
import {getState} from '@ngrx/signals';
import {Patient} from '../datasource';
interface ChartDataPoint {
  x: string; // The PatientStatus value (e.g., 'Admission')
  y: number; // The percentage (e.g., 60)
  DataLabelMappingName: string; // The formatted label (e.g., 'Admission: 60%')
}
type PatientKey = keyof Pick<Patient, 'Status' | 'PatientStatus' | 'Priority'>;
@Component({
  selector: 'app-dashboard',
  imports: [DonutChartComponent],
  standalone:true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public patientStatusData: Object[] = [];
  public departmentCapacityData: Object[] = [];
  public priorityData: Object[] = [];
  public averageWaiting:number = 0;
  public averageInTreatment:number = 0;
  patientStore = inject(PatientStore);
  constructor() {
    effect(() => {
      const state = getState(this.patientStore);
      this.patientStatusData = this.createStatusPercentageChartData(state.patients,'PatientStatus');
      this.departmentCapacityData = this.createStatusPercentageChartData(state.patients,'Status');
      this.priorityData = this.createStatusPercentageChartData(state.patients,'Priority');
      this.averageWaiting = this.calculateAverageStatusTime(state.patients,'Waiting');
      this.averageInTreatment = this.calculateAverageStatusTime(state.patients,'In Treatment');
    });
  };
  createStatusPercentageChartData(
    patients: Patient[],
    key: PatientKey
  ): ChartDataPoint[] {
    if (!patients || patients.length === 0) {
      return [];
    }

    // 1. Get the total number of patients
    const totalPatients = patients.length;

    // 2. Count the occurrences of the specified key's value
    const statusCounts = patients.reduce((acc, patient) => {
      // Dynamically access the property using the passed 'key' argument
      const statusValue = patient[key];

      // Type check: ensure the value is a string (which it is for the specified keys)
      if (typeof statusValue === 'string') {
        acc[statusValue] = (acc[statusValue] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    // 3. Convert counts to percentages and format the output (using remainder distribution for 100% sum)
    let chartData: ChartDataPoint[] = [];

    const statusPercentages: Record<string, number> = {};
    let totalPercentageSum = 0;

    // First pass: Calculate percentage and store the floor value
    for (const value in statusCounts) {
      const count = statusCounts[value];
      const exactPercentage = (count / totalPatients) * 100;
      const basePercentage = Math.floor(exactPercentage);

      statusPercentages[value] = basePercentage;
      totalPercentageSum += basePercentage;
    }

    // Determine the remaining points needed to reach 100%
    let remainder = 100 - totalPercentageSum;

    // Second pass: Distribute the remainder to the largest statuses
    const sortedValues = Object.keys(statusCounts).sort((a, b) => statusCounts[b] - statusCounts[a]);

    for (const value of sortedValues) {
      if (remainder > 0) {
        statusPercentages[value] += 1; // Add one to the percentage
        remainder--; // Decrement the remainder
      }

      // Create the final object format
      const percentage = statusPercentages[value];
      chartData.push({
        x: value,
        y: percentage,
        DataLabelMappingName: `${value}: ${percentage}%`,
      });
    }

    return chartData;
  }

  calculateAverageStatusTime(patients: Patient[],key:string){
    const totalPatients = patients.length;
    let patientWaitingTime = 0
    patients.forEach(patient => {

      for(let i = 0; i<patient.StatusTracking.length;++i){
        if(patient.StatusTracking[i].PatientStatus === key){
          if(i+1>=patient.StatusTracking.length){
            let time = new Date().getTime() - new Date(patient.StatusTracking[i].timeStart).getTime();
            patientWaitingTime += time;
          }else {
            let time = new Date(patient.StatusTracking[i+1].timeStart).getTime() - new Date(patient.StatusTracking[i].timeStart).getTime();
            patientWaitingTime += time;
          }
        }
      }
    })
    return +(patientWaitingTime/totalPatients/(1000*60)).toFixed(2);
  }

}
