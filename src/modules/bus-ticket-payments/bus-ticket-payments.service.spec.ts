import { Test, TestingModule } from '@nestjs/testing';
import { BusTicketPaymentsService } from './bus-ticket-payments.service';

describe('BusTicketPaymentsService', () => {
  let service: BusTicketPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusTicketPaymentsService],
    }).compile();

    service = module.get<BusTicketPaymentsService>(BusTicketPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
