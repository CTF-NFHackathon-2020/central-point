import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { SimulationNodeDatum} from 'd3';
import { Select } from '@ngxs/store';
import { KnowledgeGraphState, KnowledgeGraphStateModel } from 'src/app/knowledge-graph/knowledge-graph.state';
import { Observable } from 'rxjs';
import { GraphData } from 'src/app/knowledge-graph/graph.model';

@Component({
  selector: 'app-graph-chart',
  templateUrl: './graph-chart.component.html',
  styleUrls: ['./graph-chart.component.scss']
})
export class GraphChartComponent implements OnInit {
  
  private hostElement: HTMLElement; // Native element hosting the SVG container
  private svg: d3.Selection<SVGSVGElement, unknown, null, undefined>; // Top level SVG element

  @Select(KnowledgeGraphState.getState) graphState: Observable<KnowledgeGraphStateModel>;

  constructor(
    private readonly el: ElementRef
    ) {
      this.hostElement = this.el.nativeElement;
    }

  ngOnInit(): void {
    // get the data
    const viewBoxHeight = 60;
    const viewBoxWidth = 200;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    this.graphState.subscribe(x => {
      const simulationData: GraphData = JSON.parse(JSON.stringify(x));
      
      const simulation: any = d3.forceSimulation()
        .force('link', d3.forceLink().id((d: any) =>  d.id).distance(d => 1).strength(1))
        .force('charge', d3.forceManyBody())
        .force('linkDistance', d => 1)
        .force('center', d3.forceCenter(viewBoxWidth / 2, viewBoxHeight / 2));

      this.svg = d3.select(this.hostElement)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight);

      const link = this.svg
        .append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(simulationData.links)
        .enter().append('line')
        .attr('stroke-width', d =>  0.1)
        .attr('stroke', color('1'));

      const node = this.svg
        .append('g')
        .attr('class', 'nodes')
        .selectAll('g')
        .data(simulationData.nodes)
        .enter().append('g');

      node
        .append('circle')
        .attr('r', 1)
        .attr('fill', (d:any) => color(d.group.toString()))
        .on('click', this.onCircleClick);

      node
        .append('text')
        .text((d:any) => d.id)
        .attr('x', 3)
        .attr('y', 0.5)
        .style('font-size', 1.2)
        .style('fill', 'white');

      node
        .append('title')
        .text((d:any) => d.id);

      simulation
        .nodes(simulationData.nodes)
        .on('tick', ticked);
      
      simulation
        .force('link')
        .links(simulationData.links);

      function ticked() {
        link
          .attr('x1', (d: any) =>  d.source.x)
          .attr('y1', (d: any) =>  d.source.y)
          .attr('x2', (d: any) =>  d.target.x)
          .attr('y2', (d: any) =>  d.target.y);

        node
          .attr('transform', (d: any) => 'translate(' + d.x + ',' + d.y + ')');

      }
    })      
  
}

  onCircleClick(event: MouseEvent) {
    console.log(event);
  }

}
