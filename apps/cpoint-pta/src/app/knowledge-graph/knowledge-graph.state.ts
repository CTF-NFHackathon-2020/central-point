import { State, Action, Selector, StateContext } from '@ngxs/store';
import { KnowledgeGraphActions } from './knowledge-graph.actions';
import { KnowledgeGraphService } from './knowledge-graph.service';
import { GraphNode, GraphLink, GraphLabelEnum } from './graph.model';
import { Injectable } from '@angular/core';

export interface KnowledgeGraphStateModel {
  nodes: GraphNode[];
  links: GraphLink[];
}

@Injectable()
@State<KnowledgeGraphStateModel>({
  name: 'knowledgeGraph',
  defaults: {
    links:[{ source:'1', target: '2', value: 1}, { source:'1', target: '3', value: 1}],
    nodes:[
      {id: '1', name: 'test', label: 'Disease', group: 1},
      {id: '2', name: 'test relation', label: 'Anothoer', group: 2},
      {id: '3', name: 'test relation', label: 'Anothoer', group: 3},
      
    ]
  }
})
export class KnowledgeGraphState {
  constructor(private readonly kg: KnowledgeGraphService) {}

  @Selector()
  public static getState(state: KnowledgeGraphStateModel) {
    return state;
  }

  @Action(KnowledgeGraphActions.GetNodeRelations)
  public async getNodeRelations(ctx: StateContext<KnowledgeGraphStateModel>, action: KnowledgeGraphActions.GetNodeRelations) {
    const {nodes, links} = await this.kg.getNodeRelations('1', GraphLabelEnum.Anatomy)
    return ctx.setState({nodes, links})
  }
}
