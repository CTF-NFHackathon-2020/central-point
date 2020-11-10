import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { Gpt3Service } from './gpt3.service';

describe('Gp3Service', () => {
  let service: Gpt3Service;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();
    service = TestBed.inject(Gpt3Service);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a chat response string', async () => {
    const responseText = 'chatbot response';
    service.chat('hello there').subscribe(x => {
      expect(x.choices[0].text).toBe(responseText);
    });

    const req = httpMock.expectOne(environment.GPT3_URL);
    expect(req.request.method).toBe('POST');
    req.flush({
      choices: [{text: responseText}]
    });
  });
});
