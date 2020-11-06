import { Test, TestingModule } from '@nestjs/testing';
import { Gpt3Controller } from './gpt3.controller';

describe('Gpt3Controller', () => {
  let controller: Gpt3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Gpt3Controller],
    }).compile();

    controller = module.get<Gpt3Controller>(Gpt3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
