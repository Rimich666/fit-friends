import { Test, TestingModule } from '@nestjs/testing';
import { FitUsersController } from './fit-users.controller';

describe('FitUsersController', () => {
  let controller: FitUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FitUsersController],
    }).compile();

    controller = module.get<FitUsersController>(FitUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
