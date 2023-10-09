import { Test, TestingModule } from '@nestjs/testing';
import { FitUsersService } from './fit-users.service';

describe('FitUsersService', () => {
  let service: FitUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FitUsersService],
    }).compile();

    service = module.get<FitUsersService>(FitUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
