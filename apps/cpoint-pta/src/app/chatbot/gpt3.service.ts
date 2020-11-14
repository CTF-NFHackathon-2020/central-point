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

  question(text: string, context: string): Observable<GP3Response> {
    return this.http.post<GP3Response>(environment.GPT3_URL + '/question', {text, context})
  }
}
