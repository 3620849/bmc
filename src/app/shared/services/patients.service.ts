import {Injectable, signal, WritableSignal} from '@angular/core';
import {kanbanData, Patient} from '../../datasource';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  patientsData: Subject<Patient[]> = new Subject<Patient[]>();
  constructor() { }
  loadPatients(): void {
    //mocking server load
    setTimeout(()=>{
      this.patientsData.next(kanbanData)
    },1000)
  }
  loadPatientsObs():Observable<Patient[]> {
    //mocking server load
    let patientsArray = new Subject<Patient[]>();
    setTimeout(()=>{
      patientsArray.next(kanbanData)
    },1000)
    return patientsArray
  }
}
