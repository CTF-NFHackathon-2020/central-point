import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class KnowledgeGraphService {
    
    constructor (private readonly http: HttpService) {}

    async getPublicationText(nodeNames: any): Promise<string> {
        return "calla"
    }
}
