import { Component, OnInit, ElementRef } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import * as d3 from 'd3';
import { map } from 'rxjs/operators';
import { SimulationNodeDatum } from 'd3';
import { GraphData } from '../../knowledge-graph/graph.model';



@Component({
  selector: 'app-graph-chart',
  templateUrl: './graph-chart.component.html',
  styleUrls: ['./graph-chart.component.scss']
})
export class GraphChartComponent implements OnInit {
  hostElement: HTMLElement; // Native element hosting the SVG container
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>; // Top level SVG element
  simulation: any;

  data: GraphData;

  constructor(
    private readonly apollo: Apollo,
    private readonly el: ElementRef
    ) {
      this.hostElement = this.el.nativeElement;
    }

  ngOnInit(): void {
    // get the data
    this.apollo.watchQuery({
      query: gql`{
        Gene(name:"NF1") {
          name
          participates_gpmf {
            name
          }
        }}
      `
    }).valueChanges.pipe(
      map(x => x.data),
      map(x => JSON.stringify(x).toLowerCase()),
      map(x => JSON.parse(x))
      )
    .subscribe(x => {
      this.data.nodes = [{id: 'NF1', group: 1}, ...x.gene[0].participates_gpmf.map ((m: any) =>  ({group: 2, id: m.name}))];
      this.data.links = x.gene[0].participates_gpmf.map((m: any) => ({source: 'NF1', target: m.name, value: 1}));

      const viewBoxHeight = 60;
      const viewBoxWidth = 200;
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      this.simulation = d3.forceSimulation()
          .force('link', d3.forceLink().id((d: any) =>  d.id).distance(d => 1).strength(0.5))
          .force('charge', d3.forceManyBody())
          .force('linkDistance', d => 1)
          .force('center', d3.forceCenter(viewBoxWidth / 2, viewBoxHeight / 2));


      this.svg = d3.select(this.hostElement).append('svg')
          .attr('width', '100%')
          .attr('height', '100%')
          .attr('viewBox', '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight);

      const linkWidth = d3.scaleLinear()
                          .domain([
                            d3.min(this.data.links.map(x => x.value)),
                            d3.max(this.data.links.map(x => x.value))])
                          .range([0.1, 0.2]);

      const link = this.svg.append('g')
                          .attr('class', 'links')
                          .selectAll('line')
                          .data(this.data.links)
                          .enter().append('line')
                          .attr('stroke-width', d =>  linkWidth(d.value))
                          .attr('stroke', color('1'));

      const node = this.svg.append('g')
                          .attr('class', 'nodes')
                          .selectAll('g')
                          .data(this.data.nodes)
                          .enter().append('g');

      const circles = node.append('circle')
                          .attr('r', 1)
                          .attr('fill', d => color(d.group.toString()))
                          .on('click', this.onCircleClick);

      const lables = node.append('text')
                          .text(d => d.id)
                          .attr('x', 3)
                          .attr('y', 0.5)
                          .style('font-size', 1.2)
                          .style('fill', 'white');

      node.append('title').text(d => d.id);

      this.simulation.nodes(this.data.nodes as SimulationNodeDatum[]).on('tick', ticked);

      this.simulation.force('link').links(this.data.links);

      function ticked() {
        link.attr('x1', (d: any) =>  d.source.x)
            .attr('y1', (d: any) =>  d.source.y)
            .attr('x2', (d: any) =>  d.target.x)
            .attr('y2', (d: any) =>  d.target.y);

        node.attr('transform', (d: any) => 'translate(' + d.x + ',' + d.y + ')');

      }
  });
  }

  onCircleClick(event: MouseEvent) {
    console.log(event);
    this.simulation.force('center', d3.forceCenter(100 / 2, 100 / 2));
  }

}
