import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GraphLabelEnum, GraphData, Neo4JLink } from './graph.model';
import { AngularNeo4jService } from 'angular-neo4j';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeGraphService {
  
  constructor(
    private readonly apollo: Apollo,
    private readonly neo4j: AngularNeo4jService
    ) {
      this.neo4j.connect('bolt://15.236.64.163:7687', 'neo4j', 'FrKnFXrvsWO3', false).then(x =>
        console.log('Neo4j connected', x))
  }
  
  async getNodeRelationsByIdentifier(nodeIdentifier: string): Promise<GraphData> {
    const query = `MATCH p=(n{identifier: "${nodeIdentifier}"})-[]-() Return p limit 100`
    console.log(query);
    const relations = await this.neo4j.run(query)
    return this.getGraphDataFromNeo4JRelations(relations);
  }

  async getNodeRelationsByName(nodeName: string): Promise<GraphData> {
    const query = `MATCH p=(n{name: "${nodeName}"})-[]-() Return p limit 100`
    console.log(query);
    const relations = await this.neo4j.run(query)
    return this.getGraphDataFromNeo4JRelations(relations);
  }


  private getGraphDataFromNeo4JRelations(relations: Neo4JLink[]): GraphData {
    return relations
    .map(x => x[0])
    .reduce((a:GraphData, c:Neo4JLink) => {

      const startIdentifier =  c.start.properties.identifier?.toString() || c.start.properties.name?.toString() || c.start.properties.title?.toString() || c.start.properties.date?.toString() || 'unknown'
      const endIdentifier = c.end.properties.identifier?.toString() || c.end.properties.name?.toString() || c.end.properties.title?.toString() || 'unknown' ; 
      
      if (a.nodes.length === 0) {
        return {...a, 
          links:[...a.links, {
            source: startIdentifier, 
            target: endIdentifier,
            value: 1
          }],
          nodes: [
            {
              id: startIdentifier, 
              name: c.start.properties.name || c.start.properties.title, 
              label: c.start.labels[0], 
              group: GraphLabelEnum[c.start.labels[0]]
            },
            {
              id: endIdentifier, 
              name: c.end.properties.name || c.end.properties.title, 
              label: c.end.labels[0], 
              group: GraphLabelEnum[c.end.labels[0]]
            }]
        }    
      }

      return {...a, 
        links:[...a.links, { 
          source: startIdentifier, 
          target: endIdentifier,
          value: 1
        }],
        nodes: [...a.nodes,
          {
            id: endIdentifier, 
            name: c.end.properties.name || c.end.properties.title, 
            label: c.end.labels[0], 
            group: GraphLabelEnum[c.end.labels[0]]
          }]
      }    
    }, {links:[], nodes:[]})
  }

}
