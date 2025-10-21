import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';
import {SearchService} from '../shared/services/search.service';

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
  constructor(private searchService: SearchService) {
  }
  list = [
    {name:'Department Flow',route:'./'},
    {name:'Staff shifts',route:'./staff'},
    {name:'Patients List',route:'./patients'},
    {name:'Dashboard',route:'./dashboard'}
  ];
  search($event:any){
    this.searchService.search($event.target.value)
  }
}
