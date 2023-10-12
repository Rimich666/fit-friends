import { Test, TestingModule } from '@nestjs/testing';
import { FriendsRepository } from './friends.repository';

describe('FriendsRepository', () => {
  let provider: FriendsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendsRepository],
    }).compile();

    provider = module.get<FriendsRepository>(FriendsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
