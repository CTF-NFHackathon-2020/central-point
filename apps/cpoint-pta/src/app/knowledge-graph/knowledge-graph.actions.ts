import { GraphLabelEnum } from './graph.model';

export namespace KnowledgeGraphActions {
  export class GetNodeRelationsByIdentifier {
    public static readonly type = '[KnowledgeGraph] Fetch Node/Relationships by identifier';
    constructor(public nodeIdentifier: string) { }
  }

  export class GetNodeRelationsByName {
    public static readonly type = '[KnowledgeGraph] Fetch Node/Relationships by name';
    constructor(public nodeName: string) { }
  }
}
