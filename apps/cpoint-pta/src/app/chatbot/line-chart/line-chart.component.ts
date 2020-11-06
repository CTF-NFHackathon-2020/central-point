import { Component, Input, OnInit } from '@angular/core';
import { ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() labels: string[];
  @Input() values: ChartDataSets[];


  constructor() { }

  ngOnInit(): void {}

}
