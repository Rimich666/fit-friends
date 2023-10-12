import { Test, TestingModule } from '@nestjs/testing';
import { EmailSubscriberRepository } from './email-subscriber.repository';

describe('EmailSubscriberRepository', () => {
  let provider: EmailSubscriberRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailSubscriberRepository],
    }).compile();

    provider = module.get<EmailSubscriberRepository>(EmailSubscriberRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
