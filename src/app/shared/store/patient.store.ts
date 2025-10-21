import {signalStore, withState, withMethods, patchState} from '@ngrx/signals';
import {Patient} from '../../datasource';
import {PatientsService} from '../services/patients.service';
import {inject} from '@angular/core';
type PatientStore = {
  patients: Patient[];
  loading: boolean
}
const initialState:PatientStore = {
  patients: [],
  loading: false
}
export const PatientStore = signalStore(
  { providedIn: 'root' },
  withState<PatientStore>(initialState),
  withMethods((store, patientsSrv = inject(PatientsService)) => ({
    loadPatients (){
      patchState(store,{loading:true});
      patientsSrv.loadPatientsObs().subscribe({
        next:(response)=>{
          patchState(store,{patients : response,loading:false});
        },
      error:()=>{
        patchState(store,{patients : [],loading:false});
      }})
    },
    updatePatient (patient: Patient) {
      // Find patient by id and replace it with patient
      const updatedPatients = store.patients().map(p =>
        p.Id === patient.Id ? patient : p
      );
      patchState(store,{patients:updatedPatients,loading:false});
    }
  }))
)
