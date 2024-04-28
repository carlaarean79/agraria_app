import { Test, TestingModule } from '@nestjs/testing';
import { EntornoService } from './entorno.service';

describe('EntornoService', () => {
  let service: EntornoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntornoService],
    }).compile();

    service = module.get<EntornoService>(EntornoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
