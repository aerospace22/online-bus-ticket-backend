import { Test, TestingModule } from '@nestjs/testing';
import { BusTicketsService } from './bus-tickets.service';

describe('BusTicketsService', () => {
  let service: BusTicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusTicketsService],
    }).compile();

    service = module.get<BusTicketsService>(BusTicketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
