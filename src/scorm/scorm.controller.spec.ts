import { Test, TestingModule } from '@nestjs/testing';
import { ScormController } from './scorm.controller';

describe('ScormController', () => {
  let controller: ScormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScormController],
    }).compile();

    controller = module.get<ScormController>(ScormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
