import {Injectable, signal, WritableSignal} from '@angular/core';
import {kanbanData, Patient} from '../../datasource';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  patientsData: BehaviorSubject<Patient[]> = new BehaviorSubject<Patient[]>([]);
  constructor() { }
  loadPatients(): void {
    //mocking server load
    setTimeout(()=>{
      this.patientsData.next(kanbanData)
    },1000)
  }
}
