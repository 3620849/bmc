import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GridComponent, GridModule} from '@syncfusion/ej2-angular-grids';
import {kanbanData} from '../datasource';
import {CardSettingsModel, KanbanComponent} from '@syncfusion/ej2-angular-kanban';
import {DataManager, Query} from '@syncfusion/ej2-data';
import {Subscription} from 'rxjs';
import {PatientsService} from '../shared/services/patients.service';
import {SearchService} from '../shared/services/search.service';

@Component({
  selector: 'app-patient-list',
  imports: [GridModule],
  standalone: true,
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent implements AfterViewInit,OnDestroy, OnInit {

  @ViewChild('grid') public grid?: GridComponent;

  ngAfterViewInit(): void {
    this.loadData();
    this.subscribeOnSearch();
  }
public dataManager?: DataManager;

private subscriptions: Subscription[] = [];

  constructor(private patientService:PatientsService, private searchService: SearchService) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  subscribeOnSearch (){
    let searchQuery: Query = new Query();
    this.searchService.searchValue.subscribe(value => {
      searchQuery = new Query().search(value, ['Id', 'Name', "Doctor"], 'contains', true);
      (this.grid as GridComponent).query = searchQuery;
    })
  }
  loadData () {
    this.patientService.loadPatients();
    this.subscriptions.push(this.patientService.patientsData.subscribe((res)=>{
      const grid: GridComponent  = this.grid as GridComponent;
      grid.dataSource = res;
    }))
  }
}
