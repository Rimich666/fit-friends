import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackRepository } from './feedback.repository';

describe('FeedbackRepository', () => {
  let provider: FeedbackRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackRepository],
    }).compile();

    provider = module.get<FeedbackRepository>(FeedbackRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
