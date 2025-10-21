import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

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

  list = [
    {name:'Department Flow',route:'./'},
    {name:'Staff shifts',route:'./staff'},
    {name:'Patients List',route:'./patients'},
    {name:'Dashboard',route:'./dashboard'}
  ];
}
