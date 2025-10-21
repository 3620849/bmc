import {AfterViewInit, Component, inject, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {Patient} from '../datasource';
import { DialogEventArgs, KanbanComponent, KanbanModule} from '@syncfusion/ej2-angular-kanban';
import {Subject, takeUntil,} from 'rxjs';
import {SearchService} from '../shared/services/search.service';
import { Query } from '@syncfusion/ej2-data';
import {DialogService} from '../shared/services/dialog.service';
import {PatientStore} from '../shared/store/patient.store';
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
  public data = signal<Patient[]>([]);
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();
  public patientStore = inject(PatientStore);

  constructor(private searchService: SearchService,
              private dialogSrv:DialogService) {
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

  openPatientCard($data:any){
    console.log($data);
    this.dialogSrv.showDialog($data,true);
  }

  clickItem( args: DialogEventArgs): void {
    args.cancel = true; //cancel default kanban behaviour show popup to edit item
  }
}
