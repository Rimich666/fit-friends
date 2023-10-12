import { Test, TestingModule } from '@nestjs/testing';
import { NotificationRepository } from './notification.repository';

describe('NotificationRepository', () => {
  let provider: NotificationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationRepository],
    }).compile();

    provider = module.get<NotificationRepository>(NotificationRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
