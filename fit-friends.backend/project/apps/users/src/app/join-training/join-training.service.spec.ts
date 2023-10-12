import { Test, TestingModule } from '@nestjs/testing';
import { JoinTrainingService } from './join-training.service';

describe('JoinTrainingService', () => {
  let service: JoinTrainingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JoinTrainingService],
    }).compile();

    service = module.get<JoinTrainingService>(JoinTrainingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
