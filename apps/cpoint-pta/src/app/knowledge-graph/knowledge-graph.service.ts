import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GraphData, GraphLabelEnum } from './graph.model';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeGraphService {
  
  constructor(private readonly apollo: Apollo) { }
  
  async getNodeRelations(nodeIdentifier: string, label: GraphLabelEnum): Promise<GraphData> {
    return {
      nodes: [],
      links: []
    }
  }

}
