import { Component, OnInit, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';
import { SimulationNodeDatum, schemeDark2} from 'd3';
import { Select, Store } from '@ngxs/store';
import { KnowledgeGraphState, KnowledgeGraphStateModel } from 'src/app/knowledge-graph/knowledge-graph.state';
import { Observable } from 'rxjs';
import { GraphData, GraphNode } from 'src/app/knowledge-graph/graph.model';
import { KnowledgeGraphActions } from 'src/app/knowledge-graph/knowledge-graph.actions';
import { LexIntent } from '../lex.interface';

@Component({
  selector: 'app-graph-chart',
  templateUrl: './graph-chart.component.html',
  styleUrls: ['./graph-chart.component.scss']
})
export class GraphChartComponent implements OnInit {

  @Input() intent: LexIntent;
  nodeName: string;
  
  private hostElement: HTMLElement; // Native element hosting the SVG container
  private svg: d3.Selection<SVGSVGElement, unknown, null, undefined>; // Top level SVG element

  @Select(KnowledgeGraphState.getState) graphState: Observable<KnowledgeGraphStateModel>;

  constructor(
    private readonly el: ElementRef,
    private readonly store: Store
    ) {
      this.hostElement = this.el.nativeElement;
    }

  ngOnInit(): void {
    // get the data
    const viewBoxHeight = 60;
    const viewBoxWidth = 200;
    const color = d3.scaleOrdinal(d3.schemeDark2);

    this.nodeName = Object.values(this.intent.slots).join(' ').trim()

    this.store.dispatch(new KnowledgeGraphActions.GetNodeRelationsByName(this.nodeName))

    this.graphState.subscribe(x => {
      if (x !== undefined) {
        const simulationData: GraphData = JSON.parse(JSON.stringify(x));
      
      const simulation: any = this.initSimulation(viewBoxWidth, viewBoxHeight );

      if (this.svg) {
        this.svg.remove()
      }

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
        .attr('fill', d => color(d.group?.toString()))
        .style('cursor', 'pointer')
        .on('click', (ev, node: GraphNode) => this.onCircleClick(node));

      node
        .append('text')
        .text(d => d.name)
        .attr('x', 1.5)
        .attr('y', 0.5)
        .style('font-size', 1.2)
        .style('fill', 'white');

      node
        .append('title')
        .text(d => d.label);

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
    }
    })      
}

  onCircleClick(node: GraphNode) {
    this.store.dispatch(new KnowledgeGraphActions.GetNodeRelationsByName(node.name))
  }

  initSimulation(viewBoxWidth, viewBoxHeight): any {
    return d3.forceSimulation()
    .force('link', d3.forceLink().id((d: any) =>  d.id).distance(d => 1).strength(1))
    .force('charge', d3.forceManyBody())
    .force('linkDistance', d => 1)
    .force('center', d3.forceCenter(viewBoxWidth / 2, viewBoxHeight / 2));
  }

}
