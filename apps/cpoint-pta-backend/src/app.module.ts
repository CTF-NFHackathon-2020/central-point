import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Gpt3Controller } from './gpt3/gpt3.controller';
import { Gpt3Service } from './gpt3/gpt3.service';
import { KnowledgeGraphController } from './knowledge-graph/knowledge-graph.controller';
import { KnowledgeGraphService } from './knowledge-graph/knowledge-graph.service';
import { Neo4jModule } from 'nest-neo4j';

@Module({
  imports: [
    ConfigModule.forRoot(),
    Neo4jModule.fromEnv(),
    HttpModule
  ],
  controllers: [AppController, Gpt3Controller, KnowledgeGraphController],
  providers: [AppService, Gpt3Service, KnowledgeGraphService],
})
export class AppModule {}
