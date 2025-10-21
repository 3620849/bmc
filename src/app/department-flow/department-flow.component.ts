import {AfterViewInit, Component, effect, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {kanbanData} from '../datasource';
import {CardSettingsModel, DialogEventArgs, KanbanComponent, KanbanModule} from '@syncfusion/ej2-angular-kanban';
import { DataManager } from '@syncfusion/ej2-data';
import {PatientsService} from '../shared/services/patients.service';
import {Subscription, take} from 'rxjs';
import {SearchService} from '../shared/services/search.service';
import { Query } from '@syncfusion/ej2-data';
import {DialogService} from '../shared/services/dialog.service';
@Component({
  selector: 'app-department-flow',
  imports: [KanbanModule],
  standalone:true,
  templateUrl: './department-flow.component.html',
  styleUrl: './department-flow.component.scss'
})
export class DepartmentFlowComponent implements AfterViewInit,OnDestroy, OnInit {

  ngAfterViewInit(): void {
    this.loadData();
    this.subscribeOnSearch();
  }
  @ViewChild('Kanban') public kanban?: KanbanComponent;
  public dataManager?: DataManager;
  //public data: Object[] = kanbanData;
  public cardSettings: CardSettingsModel = {
    contentField: 'Summary',
    headerField: 'Id'
  };
  private subscriptions: Subscription[] = [];

  constructor(private patientService:PatientsService, private searchService: SearchService,private dialogSrv:DialogService) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  subscribeOnSearch (){
    let searchQuery: Query = new Query();
    this.searchService.searchValue.subscribe(value => {
      searchQuery = new Query().search(value, ['Id', 'Name', "Doctor","Status"], 'contains', true);
      (this.kanban as KanbanComponent).query = searchQuery;
    })
  }
  loadData () {
      this.patientService.loadPatients();
    this.patientService.patientsData.pipe(take(1)).subscribe((res)=>{
      const kanban: KanbanComponent  = this.kanban as KanbanComponent;
      kanban.dataSource = res;
    })
  }

  openPatientCard($data:any){
    console.log($data);
    this.dialogSrv.showDialog($data,true);
  }

  clickItem( args: DialogEventArgs): void {
    args.cancel = true;
  }
}
