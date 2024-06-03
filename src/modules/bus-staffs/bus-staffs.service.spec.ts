import { Test, TestingModule } from '@nestjs/testing';
import { BusStaffsService } from './bus-staffs.service';

describe('BusStaffsService', () => {
  let service: BusStaffsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusStaffsService],
    }).compile();

    service = module.get<BusStaffsService>(BusStaffsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
