import {AfterViewInit, Component, effect, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GridComponent, GridModule} from '@syncfusion/ej2-angular-grids';
import {Entity, kanbanData, Patient} from '../datasource';
import {CardSettingsModel, KanbanComponent} from '@syncfusion/ej2-angular-kanban';
import {DataManager, Query} from '@syncfusion/ej2-data';
import {Subject, Subscription, takeUntil} from 'rxjs';
import {PatientsService} from '../shared/services/patients.service';
import {SearchService} from '../shared/services/search.service';
import {PatientStore} from '../shared/store/patient.store';
import {getState} from '@ngrx/signals';
import {DialogService} from '../shared/services/dialog.service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-patient-list',
  imports: [GridModule, JsonPipe],
  standalone: true,
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent implements OnDestroy, OnInit {

  @ViewChild('grid') public grid?: GridComponent;
  private $destroy = new Subject<boolean>();

public dataList: Patient[] =[];


private subscriptions: Subscription[] = [];
  public patientStore = inject(PatientStore);
  constructor(private searchService: SearchService, private dialogSrv:DialogService) {
    effect(() => {
      const state = getState(this.patientStore);
      this.dataList = JSON.parse(JSON.stringify(state.patients))
    });
  }

  ngOnDestroy(): void {
       this.$destroy.next(true);
    }

  ngOnInit(): void {
    this.subscribeOnSearch ()
  }

  subscribeOnSearch (){
    let searchQuery: Query = new Query();
    this.searchService.searchValue.pipe(takeUntil(this.$destroy)).subscribe(value => {
      searchQuery = new Query().search(value, ['Id', 'Name', "Doctor","Status"], 'contains', true);
      (this.grid as GridComponent).query = searchQuery;
    })
  }

  doubleClick(e:any){
    const patient = this.dataList.find(patient=>patient.Id === e.rowData.Id) as Entity;
    this.dialogSrv.showDialog({type:'Patient',data:patient},true);
  }

}
