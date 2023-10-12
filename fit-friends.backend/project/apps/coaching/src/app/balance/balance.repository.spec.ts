import { Test, TestingModule } from '@nestjs/testing';
import { BalanceRepository } from './balance.repository';

describe('BalanceRepository', () => {
  let provider: BalanceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalanceRepository],
    }).compile();

    provider = module.get<BalanceRepository>(BalanceRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
