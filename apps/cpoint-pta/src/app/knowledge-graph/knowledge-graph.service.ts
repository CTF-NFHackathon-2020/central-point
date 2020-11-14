import { Injectable } from '@angular/core';
import { GraphLabelEnum, GraphData, Neo4JLink } from './graph.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeGraphService {
  
  constructor(
    private readonly http: HttpClient
    ) { }
  
  async getNodeRelationsByIdentifier(nodeIdentifier: string): Promise<GraphData> {
    const relations = await this.http.get<Neo4JLink[]>(environment.Knowledge_URL + '/id/'+nodeIdentifier).pipe(take(1)).toPromise();
    return this.getGraphDataFromNeo4JRelations(relations);
  }

  async getNodeRelationsByName(nodeName: string): Promise<GraphData> {
    const relations = await this.http.get<Neo4JLink[]>(environment.Knowledge_URL + '/name/'+nodeName).pipe(take(1)).toPromise();
    return this.getGraphDataFromNeo4JRelations(relations);
  }


  private getGraphDataFromNeo4JRelations(relations: Neo4JLink[]): GraphData {
    return relations
    .reduce((a:GraphData, c:Neo4JLink) => {

      const startIdentifier =  c.start.properties.identifier?.toString() || c.start.properties.name?.toString() || c.start.properties.title?.toString() || c.start.properties.date?.toString() || 'unknown'
      const endIdentifier = c.end.properties.identifier?.toString() || c.end.properties.name?.toString() || c.end.properties.title?.toString() || 'unknown' ; 
      
      if (a.nodes.length === 0) {
        return {...a, 
          links:[...a.links, {
            source: c.start.properties.name, 
            target: c.end.properties.name,
            value: 1
          }],
          nodes: [
            {
              id: c.start.properties.name, 
              name: c.start.properties.name || c.start.properties.title, 
              label: c.start.labels[0], 
              group: GraphLabelEnum[c.start.labels[0]]
            },
            {
              id: c.end.properties.name, 
              name: c.end.properties.name || c.end.properties.title, 
              label: c.end.labels[0], 
              group: GraphLabelEnum[c.end.labels[0]]
            }]
        }    
      }

      return {...a, 
        links:[...a.links, { 
          source: c.start.properties.name, 
          target: c.end.properties.name,
          value: 1
        }],
        nodes: [...a.nodes,
          {
            id: c.end.properties.name, 
            name: c.end.properties.name || c.end.properties.title, 
            label: c.end.labels[0], 
            group: GraphLabelEnum[c.end.labels[0]]
          }]
      }    
    }, {links:[], nodes:[]})
  }

}
