import { Test, TestingModule } from '@nestjs/testing';
import { FileRepository } from './file.repository';

describe('FileRepository', () => {
  let provider: FileRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileRepository],
    }).compile();

    provider = module.get<FileRepository>(FileRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
