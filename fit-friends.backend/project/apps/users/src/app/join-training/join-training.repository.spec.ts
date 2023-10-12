import { Test, TestingModule } from '@nestjs/testing';
import { JoinTrainingRepository } from './join-training.repository';

describe('JoinTrainingRepository', () => {
  let provider: JoinTrainingRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JoinTrainingRepository],
    }).compile();

    provider = module.get<JoinTrainingRepository>(JoinTrainingRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
