import { Controller, Post, Body } from '@nestjs/common';
import { KnowledgeGraphService } from './knowledge-graph.service';

@Controller('knowledge-graph')
export class KnowledgeGraphController {
    
    constructor (private readonly kg:KnowledgeGraphService) {}
    
    @Post('publications')
    async getPublicationText(@Body() body: any): Promise<string> {
        return this.kg.getPublicationText(body.nodeNames);
    }
}
