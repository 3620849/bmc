import { Component } from '@angular/core';
import {kanbanData} from '../datasource';
import {CardSettingsModel, KanbanModule} from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-department-flow',
  imports: [KanbanModule],
  standalone:true,
  templateUrl: './department-flow.component.html',
  styleUrl: './department-flow.component.scss'
})
export class DepartmentFlowComponent {

  public data: Object[] = kanbanData;
  public cardSettings: CardSettingsModel = {
    contentField: 'Summary',
    headerField: 'Id'
  };
}
