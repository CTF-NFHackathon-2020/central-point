import { Injectable, HttpService } from '@nestjs/common';
import { Neo4jService,  } from 'nest-neo4j';

export interface Neo4JLink {
    start: Neo4JNode;
    end: Neo4JNode,
    value: number;
  }

  
export interface Neo4JNode {
    identity: string;
    labels: string[];
    properties: {
      identifier: string;
      name: string;
      url?: string;
      title?: string;
      date?: number;
    }
  }

@Injectable()
export class KnowledgeGraphService {
    
    constructor (private readonly neo4jService: Neo4jService) {}

    async getNodeRelationsByIdentifier(nodeIdentifier: string): Promise<any[]> {
        const result = await this.neo4jService.read(`MATCH p=(n{identifier:"${nodeIdentifier}"})-[]-() Return p limit 100`);

        return result
                .records
                .map(x => x.toObject())
                .map((x: any)=> x.p)

        
    }

    async getNodeRelationsByName(nodeName: string): Promise<any[]> {
        const result = await this.neo4jService.read(`MATCH p=(n{name:"${nodeName}"})-[]-() Return p limit 100`);

        return result
                .records
                .map(x => x.toObject())
                .map((x: any)=> x.p)
    }

    async getPublicationText(nodeNames: any): Promise<any> {
        return (await this.neo4jService.read(`MATCH p=(n{name: "neurofibromatosis 1"})-[]-() Return p limit 100`)).records.map(x => x.toObject())   
    }
}
