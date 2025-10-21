import {Component, computed, effect, inject, input, OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import {NgIf} from '@angular/common';
import {Entity, Patient} from '../datasource';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import {AutoCompleteModule, DropDownListModule, MultiSelectModule} from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import {TextBoxAllModule} from '@syncfusion/ej2-angular-inputs';
import {PatientStore} from '../shared/store/patient.store';
import {DialogService} from '../shared/services/dialog.service';
import {
  EditService,
  EditSettingsModel,
  GridModule,
  PageService,
  SortService,
  ToolbarService
} from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-patient',
  imports: [
    ReactiveFormsModule,
    DropDownListModule,
    NgIf,
    TextBoxAllModule,
    ButtonModule,
    GridModule,
    AutoCompleteModule,
    MultiSelectModule,
    FormsModule
  ],
  providers: [EditService, ToolbarService, SortService, PageService],
  standalone: true,
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent implements OnInit {
  // Define the form group
  patientForm!: UntypedFormGroup;

  // Initial data object
  patientData=input<Entity|Patient|undefined>();

  // Dropdown list data sources (example values)
  statusData: string[] = ['Emergency','ICU','General Ward','Outpatient','Radiology'];
  patientStatusData: string[] = ['Admission','In Treatment', 'Waiting', 'Discharged', 'Critical'];
  priorityData: string[] = ['Critical', 'Urgent', 'Standard', 'Routine'];
  doctorData: string[] = ['Burger', 'Roi', 'John']; // Example list of doctors
  patientStore = inject(PatientStore);

  recordsData = [];
  recordsEditSettings:EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true  };
  toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  orderIDRules = { required: true };
  customerIDRules = { required: true, minLength: 5 };
  numericParams = {
    params: {
      decimals: 0,
      format: 'N',
      showClearButton: true,
      showSpinButton: false
    }
  }
  constructor(private fb: FormBuilder,private dialogService: DialogService) {
    effect(() => {
      const data = this.patientData();
      if(data && this.isPatient(data)){
        this.recordsData = data.Records;
        this.patientForm = new FormGroup({
          Id: new FormControl<number>({ value: data.Id, disabled: true },[]), // ID is usually read-only
          Name: new FormControl<string>(data.Name, [Validators.required]),
          Status: new FormControl<string>(data.Status, [Validators.required]),
          PatientStatus: new FormControl<string>(data.PatientStatus, [Validators.required]),
          Summary: new FormControl<string>(data.Summary),
          Priority: new FormControl<string>(data.Priority, [Validators.required]),
          Doctor: new FormControl<string>(data.Doctor, [Validators.required]),
          Bed: new FormControl<string>(data.Bed, [Validators.required])
        });
      }else {
        this.patientForm = new FormGroup({
          Id: new FormControl<number>({ value: -1, disabled: true }),
          Name: new FormControl<string>('', [Validators.required]),
          Status: new FormControl<string>('', [Validators.required]),
          PatientStatus: new FormControl<string>('', [Validators.required]),
          Summary: new FormControl<string>('', [Validators.required]),
          Priority: new FormControl<string>('', [Validators.required]),
          Doctor: new FormControl<string>('', [Validators.required]),
          Bed: new FormControl<string>('', [Validators.required]),
        });
      }
    });
  }

  ngOnInit(): void {

  }

  //type guard
  isPatient(entity: Entity | undefined): entity is Patient {
    if (!entity) {
      return false;
    }
    return (entity as Patient).Status !== undefined;
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.patientForm.valid) {
      // Get the form value, including the disabled Id
      const patient = { ...this.patientForm.getRawValue() };
      patient.Records = this.recordsData;
      this.patientStore.updatePatient(patient);
    } else {
      console.log('error')
    }
    this.dialogService.showDialog(null,false)
  }
  beforePaste(event:any){
    if(event && event.data){
      event.data.UpdateAt=this.getDate();
    }
    console.log(event)
  }
  getDate(){
    const d = new Date();
    const pad = (n:number) => String(n).padStart(2, '0');

    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const year = String(d.getFullYear()).slice(-2);
    const hour = pad(d.getHours());
    const minute = pad(d.getMinutes());
    const sec = pad(d.getSeconds());

    return `${month}/${day}/${year} ${hour}:${minute}:${sec}`;
  }
}
