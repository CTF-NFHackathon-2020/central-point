import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Gpt3Controller } from './gpt3/gpt3.controller';
import { Gpt3Service } from './gpt3/gpt3.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule
  ],
  controllers: [AppController, Gpt3Controller],
  providers: [AppService, Gpt3Service],
})
export class AppModule {}
