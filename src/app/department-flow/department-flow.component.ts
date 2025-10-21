import {AfterViewInit, Component, effect, inject, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {Patient} from '../datasource';
import {CardSettingsModel, DialogEventArgs, KanbanComponent, KanbanModule} from '@syncfusion/ej2-angular-kanban';
import {Subject, takeUntil,} from 'rxjs';
import {SearchService} from '../shared/services/search.service';
import { Query } from '@syncfusion/ej2-data';
import {DialogService} from '../shared/services/dialog.service';
import {PatientStore} from '../shared/store/patient.store';
import {getState} from '@ngrx/signals';
@Component({
  selector: 'app-department-flow',
  imports: [KanbanModule],
  standalone:true,
  templateUrl: './department-flow.component.html',
  styleUrl: './department-flow.component.scss'
})
export class DepartmentFlowComponent implements AfterViewInit,OnDestroy, OnInit {

  ngAfterViewInit(): void {
    this.subscribeOnSearch();
  }
  @ViewChild('Kanban') public kanban?: KanbanComponent;
  public data:Patient[] = [];
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();
  public patientStore = inject(PatientStore);
  public settings: CardSettingsModel = {
    headerField: 'Id'
  };
  constructor(private searchService: SearchService,
              private dialogSrv:DialogService) {
    effect(() => {
      const state = getState(this.patientStore);
      //ejs dont work with signals
      this.data = JSON.parse(JSON.stringify(state.patients))
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
       this.unsubscribe$.next(true)
  }

  subscribeOnSearch (){
    let searchQuery: Query = new Query();
    this.searchService.searchValue.pipe(takeUntil(this.unsubscribe$)).subscribe(value => {
      searchQuery = new Query().search(value, ['Id', 'Name', "Doctor","Status"], 'contains', true);
      (this.kanban as KanbanComponent).query = searchQuery;
    })
  }

  openPatientCard($data:Patient){
    console.log($data)
    this.dialogSrv.showDialog({type:"Patient", data:$data},true);
  }

  clickItem( args: DialogEventArgs): void {
    args.cancel = true; //cancel default kanban behaviour show popup to edit item
  }
  changeData(event:any){
    if(event && event.changedRecords[0]){
      console.log(event.changedRecords[0])
      this.patientStore.updatePatient(event.changedRecords[0]);
    }
  }
}
