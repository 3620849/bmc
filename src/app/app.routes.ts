import { Routes } from '@angular/router';
import {DepartmentFlowComponent} from './department-flow/department-flow.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./department-flow/department-flow.component').then((m) => m.DepartmentFlowComponent),
  },
  {
    path: 'patients',
    loadComponent: () => import('./patient-list/patient-list.component').then((m) => m.PatientListComponent),
  },
  {
    path: 'staff',
    loadComponent: () => import('./staff-shift/staff-shift.component').then((m) => m.StaffShiftComponent),
  },
  {
    path: 'patient/:id',
    loadComponent: () => import('./patient/patient.component').then((m) => m.PatientComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'doctor',
    loadComponent: () => import('./doctor/doctor.component').then((m) => m.DoctorComponent),
  },
  {
    path: 'patients',
    loadComponent: () => import('./patient-list/patient-list.component').then((m) => m.PatientListComponent),
  }
];
