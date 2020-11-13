import { GraphLabelEnum } from './graph.model';

export namespace KnowledgeGraphActions {
  export class GetNodeRelations {
    public static readonly type = '[KnowledgeGraph] Fetch Node/Relationships';
    constructor(public nodeIdentifier: string, public label: GraphLabelEnum ) { }
  }
}
