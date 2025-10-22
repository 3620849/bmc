import {AfterViewInit, Component, Input, input, OnInit, ViewChild} from '@angular/core';
import {
  AccumulationChartAllModule, AccumulationChartComponent,
  ChartAllModule,
  IAccLoadedEventArgs,
} from '@syncfusion/ej2-angular-charts';
import {loadAccumulationChartTheme} from '../../theme-colors';
@Component({
  selector: 'app-donut-chart',
  imports: [
    ChartAllModule, AccumulationChartAllModule
  ],
  standalone: true,
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.scss'
})
export class DonutChartComponent implements AfterViewInit {
  @ViewChild('pie') pie!: AccumulationChartComponent;
  @Input() title!: string;
  @Input() id!: string;
  @Input() data!: Object[];
  //Initializing Legend
  public legendSettings: Object = {
    visible: false,
  };
  public centerLabel: Object = {
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
  }

  ngAfterViewInit(): void {
    if(this.pie){
      this.pie.centerLabel.text=this.title;
      setTimeout(()=>{
        this.pie.refreshChart();
      });
    }
  };
}
