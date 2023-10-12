import { Test, TestingModule } from '@nestjs/testing';
import { TrainingRepository } from './training.repository';

describe('TrainingRepository', () => {
  let provider: TrainingRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingRepository],
    }).compile();

    provider = module.get<TrainingRepository>(TrainingRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
