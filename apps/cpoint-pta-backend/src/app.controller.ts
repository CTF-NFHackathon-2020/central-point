import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async detectIntent(@Body() body: any) {
    return this.appService.detectIntent(body.text)
  }
}
