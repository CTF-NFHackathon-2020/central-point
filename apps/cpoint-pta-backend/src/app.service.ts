import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Credentials, LexRuntime }  from 'aws-sdk';

@Injectable()
export class AppService {

  private lexRuntime: LexRuntime;
  private credentials: Credentials;
  
  constructor (private readonly config: ConfigService) {
    this.credentials = new Credentials({
      accessKeyId: this.config.get<string>('LEX_ACCESSKEYID'),
      secretAccessKey: this.config.get<string>('LEX_SECRETACCESSKEY')
    })

    console.log('credentials')

    this.lexRuntime = new LexRuntime({
      region: 'eu-west-1',
      credentials: this.credentials
    })
  }
  
  getHello(): string {
    return 'Hello World!';
  }

  async detectIntent(text: string): Promise<LexRuntime.PostTextResponse> {
    return this.lexRuntime.postText({
      botAlias: 'centralpoint',
      botName: 'CentralPoint',
      inputText: text,
      userId: 'cpoint-pta'
    }).promise()
  }
}
