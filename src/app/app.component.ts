import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AppbarmenuComponent} from './appbarmenu/appbarmenu.component';

@Component({
  selector: 'app-root',
  imports: [AppbarmenuComponent, RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
