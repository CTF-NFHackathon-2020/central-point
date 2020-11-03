import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AwsLexService {

  constructor(private readonly http: HttpClient) {
  }

  async detectIntent(text: string): Promise<any> {
    return this.http.post(environment.LEX_URL, {text}).pipe(take(1)).toPromise();
  }

}
