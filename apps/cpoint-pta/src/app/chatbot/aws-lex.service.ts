import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { take } from 'rxjs/operators';
import { LexIntent} from './lex.interface';


@Injectable({
  providedIn: 'root'
})
export class AwsLexService {

  constructor(private readonly http: HttpClient) {
  }

  async detectIntent(text: string): Promise<LexIntent> {
    return this.http.post<LexIntent>(environment.LEX_URL, {text}).pipe(take(1)).toPromise();
  }

  async chat(text: string): Promise<string> {
    return this.http.post<string>(environment.LEX_URL + '/gpt3/chat', {text}).pipe(take(1)).toPromise();
  }

}
