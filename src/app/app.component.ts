import {AfterViewInit, Component, inject, OnInit, signal, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AppbarmenuComponent} from './appbarmenu/appbarmenu.component';
import {DialogComponent, DialogModule, PositionDataModel} from '@syncfusion/ej2-angular-popups';
import {DialogService} from './shared/services/dialog.service';
import {PatientComponent} from './patient/patient.component';
import {PatientStore} from './shared/store/patient.store';

@Component({
  selector: 'app-root',
  imports: [AppbarmenuComponent, RouterOutlet, DialogModule, PatientComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public patientStore = inject(PatientStore);
  patient = signal<any>(null);
  @ViewChild('ejDialog') ejDialog: DialogComponent | any;
  constructor(private dialogService:DialogService) {
  }
  public position: PositionDataModel = { X: 'center', Y: 'center' };
  ngOnInit(): void {
    this.patientStore.loadPatients();
      this.dialogService.show.subscribe(value => {
        value ? this.ejDialog.show() : this.ejDialog.hide();
      })
    this.dialogService.dialogData.subscribe(value => {
      this.patient.set(value)})
  }


}
