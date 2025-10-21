import { Component } from '@angular/core';
import {
  AccumulationChartAllModule,
  ChartAllModule,
  ChartModule, IAccLoadedEventArgs,
  LegendSettingsModel,
  TooltipSettingsModel
} from '@syncfusion/ej2-angular-charts';
import { loadAccumulationChartTheme } from '../theme-colors';
import {DonutChartComponent} from './donut-chart/donut-chart.component';
@Component({
  selector: 'app-dashboard',
  imports: [DonutChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public data: Object[] = [
    { x: 'Chrome', y: 63.5, DataLabelMappingName: 'Chrome: 63.5%' },
    { x: 'Safari', y: 25.0, DataLabelMappingName: 'Safari: 25.0%' },
    { x: 'Samsung Internet', y: 6.0, DataLabelMappingName: 'Samsung Internet: 6.0%' },
    { x: 'UC Browser', y: 2.5, DataLabelMappingName: 'UC Browser: 2.5%' },
    { x: 'Opera', y: 1.5, DataLabelMappingName: 'Opera: 1.5%' },
    { x: 'Others', y: 1.5, DataLabelMappingName: 'Others: 1.5%' }
  ];
  //Initializing Legend
  public legendSettings: Object = {
    visible: false,
  };
  public centerLabel: Object = {
    text: 'Mobile<br>Browser<br>Statistics<br>2024',
    hoverTextFormat: '${point.x}<br>Browser Share<br>${point.y}%',
    textStyle: {
      fontWeight: '600',
      size:   '15px'
    },
  };
  //Initializing DataLabel
  public dataLabel: Object = {
    visible: true,
    name: 'DataLabelMappingName',
    position: 'Outside',
    font: {
      fontWeight: '600',
      size:  '12px'
    },
    connectorStyle: {
      length:  '20px',
      type: 'Curve'
    },
  };
  public border: object = {
    width: 1, color: '#ffffff'
  };
  public tooltip: Object = {
    enable: true,
    enableHighlight: true,
    format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>',
    header:'',
  };
  // custom code start
  public load(args: IAccLoadedEventArgs): void {
    loadAccumulationChartTheme(args);
  };
  // custom code end
  public radius: string = '70%'
  public startAngle: number =  60;
  constructor() {
    //code
  };
}
