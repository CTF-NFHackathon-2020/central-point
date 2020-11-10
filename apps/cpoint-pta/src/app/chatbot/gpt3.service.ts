import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Gpt3Service {

  constructor(private readonly http: HttpClient) { }

  chat(text: string): Observable<string> {
    return this.http.post<string>(environment.GPT3_URL, {text});
  }
}
