import { Test, TestingModule } from '@nestjs/testing';
import { ScormService } from './scorm.service';

describe('ScormService', () => {
  let service: ScormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScormService],
    }).compile();

    service = module.get<ScormService>(ScormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
