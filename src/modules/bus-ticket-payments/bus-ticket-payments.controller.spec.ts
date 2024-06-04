import { Test, TestingModule } from '@nestjs/testing';
import { BusTicketPaymentsController } from './bus-ticket-payments.controller';

describe('BusTicketPaymentsController', () => {
  let controller: BusTicketPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusTicketPaymentsController],
    }).compile();

    controller = module.get<BusTicketPaymentsController>(BusTicketPaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
