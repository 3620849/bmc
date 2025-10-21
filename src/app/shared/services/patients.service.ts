import {Injectable, signal, WritableSignal} from '@angular/core';
import {kanbanData, Patient} from '../../datasource';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  patientsData: WritableSignal<{status:'done'|'error'|'progress', data:Patient[] }> = signal({status:'done', data:[]})
  constructor() { }
  loadPatients(): void {
    //mocking server load
    this.patientsData.set({status:'progress', data:[]});
    setTimeout(()=>{
      this.patientsData.set({status:'done', data:kanbanData});
    },1000)
  }
}
