import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { KnowledgeGraphService } from './knowledge-graph.service';

@Controller('knowledge-graph')
export class KnowledgeGraphController {
    
    constructor (private readonly kg:KnowledgeGraphService) {}
    
    @Get('id/:identifier')
    async getNodeRelationsByIdentifier(@Param() params: any) {
        console.log(params.identifier)
        return this.kg.getNodeRelationsByIdentifier(params.identifier)
    }

    @Get('name/:name')
    async getNodeRelationsByName(@Param() params: any) {
        console.log(params)
        return this.kg.getNodeRelationsByName(params.name)
    }

    @Post('publications')
    async getPublicationsText(@Body() body: any): Promise<string[]> {
        console.log(body)
        return (await this.kg.getPublicationText(body.nodeNames));
    }
}
