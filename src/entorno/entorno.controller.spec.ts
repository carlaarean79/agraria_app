import { Test, TestingModule } from '@nestjs/testing';
import { EntornoController } from './entorno.controller';
import { EntornoService } from './entorno.service';

describe('EntornoController', () => {
  let controller: EntornoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntornoController],
      providers: [EntornoService],
    }).compile();

    controller = module.get<EntornoController>(EntornoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
