import { Test, TestingModule } from '@nestjs/testing';
import { FitUsersRepository } from './fit-users.repository';

describe('FitUsersRepository', () => {
  let provider: FitUsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FitUsersRepository],
    }).compile();

    provider = module.get<FitUsersRepository>(FitUsersRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
