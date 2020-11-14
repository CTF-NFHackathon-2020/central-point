import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface GP3Response {
  id: string;
  object: string;
  created: Date;
  model: string;
  choices: GP3Choice[];
}

export interface GP3Choice {
  finish_reason: string;
  index: number;
  logProbs: any;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class Gpt3Service {

  constructor(private readonly http: HttpClient) { }

  chat(text: string): Observable<GP3Response> {
    return this.http.post<GP3Response>(environment.GPT3_URL + '/chat', {text});
  }

  async question(question: string, nodeName: string): Promise<GP3Response> {
    const context = await this.http.post<string[]>(environment.Knowledge_URL + '/publications', {nodeNames: [nodeName]}).pipe(take(1)).toPromise()
    return this.http.post<GP3Response>(environment.GPT3_URL + '/question', {text: question, context: context.join(' ').slice(0, 400)}).pipe(take(1)).toPromise();
  }
}
