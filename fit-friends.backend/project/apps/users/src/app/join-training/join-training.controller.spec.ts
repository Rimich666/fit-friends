import { Test, TestingModule } from '@nestjs/testing';
import { JoinTrainingController } from './join-training.controller';

describe('JoinTrainingController', () => {
  let controller: JoinTrainingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JoinTrainingController],
    }).compile();

    controller = module.get<JoinTrainingController>(JoinTrainingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
