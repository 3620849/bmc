import { Component } from '@angular/core';
import {GridModule} from '@syncfusion/ej2-angular-grids';
import {kanbanData} from '../datasource';

@Component({
  selector: 'app-patient-list',
  imports: [GridModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent {
  public data: Object[] = kanbanData;
}
