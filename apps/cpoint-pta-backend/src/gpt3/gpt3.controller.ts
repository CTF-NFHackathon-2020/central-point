import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from 'aws-sdk';
import { Gpt3Service } from './gpt3.service';

@Controller('gpt3')
export class Gpt3Controller {
    /**
     *
     */
    constructor(private readonly gpt3: Gpt3Service) {
    }
    
    @Post('/chat')
    async chat(@Body() body: any) {
        return this.gpt3.chat(body.text)
    }
}

