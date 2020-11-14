import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class Gpt3Service {

    
    constructor(
        private readonly config:ConfigService, 
        private readonly http:HttpService) {}

    private gptKey = this.config.get('GPT_KEY')
    
    private context = 'AI: I am a very empathetic artificial intelligence that is programmed to help patients with NF1 or neurofibromatosis type 1. I have many social skills and I like cats. You can ask me anithing and i will try to keep track your symptoms and help you with your mood.'


    async chat(text: string): Promise<any> {
        this.context += '\nHUMAN: ' + text + '\nAI:';
    
        return this.http.post('https://api.openai.com/v1/engines/davinci/completions', {
          max_tokens: 150,
          stop: '\nHUMAN:',
          prompt: this.context
        }, {
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.gptKey}`
        }}).pipe(
          take(1),
          map(x => x.data),
          tap(x => {
            this.context += x.choices[0].text;
            console.log(this.context);
          })).toPromise();
      }

    async question(question: string, questionContext: string): Promise<any> {

      const questionPipelinePresentation = `Given the following context try to answer the questions`
      const prompt = `${questionPipelinePresentation}\nContext: ${questionContext}\nQuestion: ${question}\nAnswer:`
      
      return this.http.post('https://api.openai.com/v1/engines/davinci/completions', {
        max_tokens: 500,
        stop: 'Question:',
        prompt,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.gptKey}`
      }}).pipe(
        take(1),
        map(x => x.data)
      ).toPromise()
    }
}
