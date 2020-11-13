import { State, Action, Selector, StateContext } from '@ngxs/store';
import { KnowledgeGraphActions } from './knowledge-graph.actions';
import { KnowledgeGraphService } from './knowledge-graph.service';
import { GraphNode, GraphLink } from './graph.model';

export interface KnowledgeGraphStateModel {
  nodes: GraphNode[];
  links: GraphLink[];
}

@State<KnowledgeGraphStateModel>({
  name: 'knowledgeGraph'
})
export class KnowledgeGraphState {

  
  constructor(private readonly kg: KnowledgeGraphService) {}

  @Selector()
  public static getState(state: KnowledgeGraphStateModel) {
    return state;
  }

  @Action(KnowledgeGraphActions.GetNodeRelations)
  public async getNodeRelations(ctx: StateContext<KnowledgeGraphStateModel>, action: KnowledgeGraphActions.GetNodeRelations) {
    const stateModel = ctx.getState();
    const response = await this.kg.getNodeRelations() 
    
    return ctx.setState(stateModel);
  }
}
