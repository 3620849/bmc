import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';
import {SearchService} from '../shared/services/search.service';
import {DialogService} from '../shared/services/dialog.service';
import {Patient} from '../datasource';

@Component({
  selector: 'app-appbarmenu',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './appbarmenu.component.html',
  styleUrls: ['./appbarmenu.component.scss'] // <- plural: styleUrls
})
export class AppbarmenuComponent {
  constructor(private searchService: SearchService,private dialogService: DialogService,) {
  }
  list = [
    {name:'Department Flow',route:'./'},
    /*{name:'Staff shifts',route:'./staff'},*/
    {name:'Patients List',route:'./patients'},
    {name:'Dashboard',route:'./dashboard'}
  ];
  search($event:any){
    this.searchService.search($event.target.value)
  }
  addPatient(){

    const data:Patient = {
        Id: -1,
        Name:'',
        Status: "",
        PatientStatus:"",
        Summary: '',
        Priority: '',
        Records:[],
        Doctor:"",
        Bed:'',
        StatusTracking:[],
        LastStatus: '',
        LastStatusUpdate: ''
      }
    this.dialogService.showDialog({type:"Patient",data},true);
  }
}
