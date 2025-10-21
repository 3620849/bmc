import {Component, input} from '@angular/core';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-patient',
  imports: [
    JsonPipe
  ],
  standalone: true,
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent {
  data = input()

}
