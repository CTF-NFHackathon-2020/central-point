import { namespace } from 'd3';

export namespace KnowledgeGraphActions {
  export class GetNodeRelations {
    public static readonly type = '[KnowledgeGraph] Fetch Node/Relationships';
    constructor(public nodeIdentifier: string) { }
  }
}
