import { TestBed } from '@angular/core/testing';

import { AwsLexService } from './aws-lex.service';

describe('AwsLexService', () => {
  let service: AwsLexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsLexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
