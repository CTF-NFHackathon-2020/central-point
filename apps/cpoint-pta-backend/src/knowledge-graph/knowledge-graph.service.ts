import { Injectable, HttpService } from '@nestjs/common';
import { Neo4jService,  } from 'nest-neo4j';
import { take, map } from 'rxjs/operators';

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
    
    constructor (
        private readonly neo4jService: Neo4jService,
        private readonly http: HttpService
        ) {}

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

    async getPublicationText(nodeNames: any[]): Promise<any> {
        const urls = (await this.neo4jService
            .read(`match p=(n)<-[:MENTIONS]-(d:Publication) where n.name in [${nodeNames.map(x => '"'+x+'"').join(',')}] return distinct(d.texturl)`))
            .records
                .map(x => x.toObject()).map((x: any)=>x['(d.texturl)'])
                .map(x => this.http.get(x).pipe(take(1), map(u => u.data)).toPromise())

        return Promise.all(urls)
    }
}
