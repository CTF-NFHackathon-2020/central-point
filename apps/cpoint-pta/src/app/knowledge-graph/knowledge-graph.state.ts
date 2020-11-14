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
    "links": [
      {
        "source": "DB01148",
        "target": "DB01231",
        "value": 1
      },
      {
        "source": "DB01148",
        "target": "C0039231",
        "value": 1
      },
      {
        "source": "DB01148",
        "target": "27115",
        "value": 1
      },
      {
        "source": "DB01148",
        "target": "C0013144",
        "value": 1
      },
      {
        "source": "DB01148",
        "target": "5150",
        "value": 1
      },
      {
        "source": "DB01148",
        "target": "39",
        "value": 1
      },
      {
        "source": "DB01148",
        "target": "1129",
        "value": 1
      },
      {
        "source": "DB01148",
        "target": "C1443060",
        "value": 1
      },
      {
        "source": "DB01148",
        "target": "1128",
        "value": 1
      },
      {
        "source": "DB01148",
        "target": "DB01419",
        "value": 1
      },
      {
        "source": "DB01148",
        "target": "DB00645",
        "value": 1
      },
      {
        "source": "DB01148",
        "target": "C0009676",
        "value": 1
      },
      {
        "source": "DB01148",
        "target": "C0030252",
        "value": 1
      },
      {
        "source": "DB01148",
        "target": "C0042109",
        "value": 1
      },
      {
        "source": "DB01148",
        "target": "C0042571",
        "value": 1
      },
      {
        "source": "DB01148",
        "target": "C0027769",
        "value": 1
      },
      {
        "source": "DB01148",
        "target": "C0018681",
        "value": 1
      },
      {
        "source": "DB01148",
        "target": "C0023530",
        "value": 1
      },
      {
        "source": "DB01148",
        "target": "C0392676",
        "value": 1
      },
      {
        "source": "DB01148",
        "target": "5144",
        "value": 1
      }
    ],
    "nodes": [
      {
        "id": "DB01148",
        "name": "Flavoxate",
        "label": "Compound",
        "group": 7
      },
      {
        "id": "DB01231",
        "name": "Diphenidol",
        "label": "Compound",
        "group": 7
      },
      {
        "id": "C0039231",
        "name": "Tachycardia",
        "label": "SideEffect",
        "group": 9
      },
      {
        "id": "27115",
        "name": "PDE7B",
        "label": "Gene",
        "group": 3
      },
      {
        "id": "C0013144",
        "name": "Drowsiness",
        "label": "SideEffect",
        "group": 9
      },
      {
        "id": "5150",
        "name": "PDE7A",
        "label": "Gene",
        "group": 3
      },
      {
        "id": "39",
        "name": "ACAT2",
        "label": "Gene",
        "group": 3
      },
      {
        "id": "1129",
        "name": "CHRM2",
        "label": "Gene",
        "group": 3
      },
      {
        "id": "C1443060",
        "name": "Feeling abnormal",
        "label": "SideEffect",
        "group": 9
      },
      {
        "id": "1128",
        "name": "CHRM1",
        "label": "Gene",
        "group": 3
      },
      {
        "id": "DB01419",
        "name": "Antrafenine",
        "label": "Compound",
        "group": 7
      },
      {
        "id": "DB00645",
        "name": "Dyclonine",
        "label": "Compound",
        "group": 7
      },
      {
        "id": "C0009676",
        "name": "Confusional state",
        "label": "SideEffect",
        "group": 9
      },
      {
        "id": "C0030252",
        "name": "Palpitations",
        "label": "SideEffect",
        "group": 9
      },
      {
        "id": "C0042109",
        "name": "Urticaria",
        "label": "SideEffect",
        "group": 9
      },
      {
        "id": "C0042571",
        "name": "Vertigo",
        "label": "SideEffect",
        "group": 9
      },
      {
        "id": "C0027769",
        "name": "Nervousness",
        "label": "SideEffect",
        "group": 9
      },
      {
        "id": "C0018681",
        "name": "Headache",
        "label": "SideEffect",
        "group": 9
      },
      {
        "id": "C0023530",
        "name": "Leukopenia",
        "label": "SideEffect",
        "group": 9
      },
      {
        "id": "C0392676",
        "name": "Hyperpyrexia",
        "label": "SideEffect",
        "group": 9
      },
      {
        "id": "5144",
        "name": "PDE4D",
        "label": "Gene",
        "group": 3
      }
    ]
  }
})
export class KnowledgeGraphState {
  constructor(private readonly kg: KnowledgeGraphService) {}

  @Selector()
  public static getState(state: KnowledgeGraphStateModel) {
    return state;
  }

  @Action(KnowledgeGraphActions.GetNodeRelationsByIdentifier)
  public async getNodeRelations(ctx: StateContext<KnowledgeGraphStateModel>, action: KnowledgeGraphActions.GetNodeRelationsByIdentifier) {
    const response = await this.kg.getNodeRelationsByIdentifier(action.nodeIdentifier)
    console.log(response);
    return ctx.setState({nodes: response?.nodes, links: response?.links})
  }

  @Action(KnowledgeGraphActions.GetNodeRelationsByName)
  public async getNodeRelationsByName(ctx: StateContext<KnowledgeGraphStateModel>, action: KnowledgeGraphActions.GetNodeRelationsByName) {
    const response = await this.kg.getNodeRelationsByName(action.nodeName)
    console.log(response);
    return ctx.setState({nodes: response?.nodes, links: response?.links})
  }
}
