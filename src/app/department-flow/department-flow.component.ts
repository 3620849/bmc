import {AfterViewInit, Component, effect, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {kanbanData} from '../datasource';
import {CardSettingsModel, KanbanComponent, KanbanModule} from '@syncfusion/ej2-angular-kanban';
import { DataManager } from '@syncfusion/ej2-data';
import {PatientsService} from '../shared/services/patients.service';
import {Subscription, take} from 'rxjs';

@Component({
  selector: 'app-department-flow',
  imports: [KanbanModule],
  standalone:true,
  templateUrl: './department-flow.component.html',
  styleUrl: './department-flow.component.scss'
})
export class DepartmentFlowComponent implements AfterViewInit,OnDestroy {

  ngAfterViewInit(): void {
    this.loadData();
  }
  @ViewChild('Kanban') public kanban?: KanbanComponent;
  public dataManager?: DataManager;
  public data: Object[] = kanbanData;
  public cardSettings: CardSettingsModel = {
    contentField: 'Summary',
    headerField: 'Id'
  };
  private subscriptions: Subscription[] = [];

  constructor(private patientService:PatientsService) {
  }

  ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  loadData () {
      this.patientService.loadPatients();
      this.subscriptions.push(this.patientService.patientsData.subscribe((res)=>{
        const kanban: KanbanComponent  = this.kanban as KanbanComponent;
        kanban.dataSource = res;
      }))
  }
}
