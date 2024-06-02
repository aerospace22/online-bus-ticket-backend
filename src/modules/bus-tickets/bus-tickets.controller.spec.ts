import { Test, TestingModule } from '@nestjs/testing';
import { BusTicketsController } from './bus-tickets.controller';

describe('BusTicketsController', () => {
  let controller: BusTicketsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusTicketsController],
    }).compile();

    controller = module.get<BusTicketsController>(BusTicketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
