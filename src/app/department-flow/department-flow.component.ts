import {AfterViewInit, Component, effect, OnInit, ViewChild} from '@angular/core';
import {kanbanData} from '../datasource';
import {CardSettingsModel, KanbanComponent, KanbanModule} from '@syncfusion/ej2-angular-kanban';
import { DataManager } from '@syncfusion/ej2-data';
import {PatientsService} from '../shared/services/patients.service';

@Component({
  selector: 'app-department-flow',
  imports: [KanbanModule],
  standalone:true,
  templateUrl: './department-flow.component.html',
  styleUrl: './department-flow.component.scss'
})
export class DepartmentFlowComponent implements AfterViewInit {
  loaded:boolean = false;
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

  loadData (){
    if(!this.loaded){
      this.patientService.loadPatients();
    }
  }

  constructor(private patientService:PatientsService) {
    effect(() => {
      const kanban: KanbanComponent  = this.kanban as KanbanComponent;
      kanban.dataSource = this.patientService.patientsData().data;
    });
  }
}
