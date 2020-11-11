import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import * as d3 from 'd3';
import * as d3Force from 'd3-force';
import { map } from 'rxjs/operators';

const symptomsQuery = gql`
query{
    Symptom(first:10){
      name
      diseases(first:10) {
        name
      }
    }
}

`;

@Component({
  selector: 'app-graph-chart',
  templateUrl: './graph-chart.component.html',
  styleUrls: ['./graph-chart.component.scss']
})
export class GraphChartComponent implements OnInit {

  constructor(private readonly apollo: Apollo) { }

  ngOnInit(): void {
    // get the data

    this.apollo.watchQuery({
      query: gql`{
        Disease(first:10) {
          name
          presents_dps(first:10) {
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
      const diseases = x.disease.map(z => z.name);
      console.log(diseases)
    });

  }

}
