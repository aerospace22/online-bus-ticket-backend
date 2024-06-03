import { Test, TestingModule } from '@nestjs/testing';
import { BusStaffsController } from './bus-staffs.controller';

describe('BusStaffsController', () => {
  let controller: BusStaffsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusStaffsController],
    }).compile();

    controller = module.get<BusStaffsController>(BusStaffsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
