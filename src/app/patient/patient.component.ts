import {Component, computed, effect, input, OnInit} from '@angular/core';
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
import {DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import {TextBoxAllModule} from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-patient',
  imports: [
    ReactiveFormsModule,
    DropDownListModule,
    NgIf,
    TextBoxAllModule,
    ButtonModule,
  ],
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
  statusData: string[] = ['ICU', 'General Ward', 'Discharged'];
  patientStatusData: string[] = ['Waiting', 'Treated', 'On Hold'];
  priorityData: string[] = ['Critical', 'High', 'Medium', 'Low'];
  doctorData: string[] = ['Burger', 'Roi', 'Smith']; // Example list of doctors

  constructor(private fb: FormBuilder) {
    effect(() => {
      const data = this.patientData();
      if(data && this.isPatient(data)){
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
    const formValue = { ...this.patientForm.getRawValue() };

    // Merge with non-form properties if needed (like 'Records')
    const updatedPatient = {
      ...this.patientData, // Original data
      ...formValue,         // Form updates
      // Note: 'Records' remains as it was since it wasn't in the form
    };

    console.log('Updated Patient Data:', updatedPatient);
    // Here you would typically call a service to save the data
  } else {
    console.log('Form is invalid. Please check the required fields.');
  }
}
}
