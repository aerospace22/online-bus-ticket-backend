import { Module } from '@nestjs/common';
import { BusTicketsController } from './bus-tickets.controller';
import { BusTicketsService } from './bus-tickets.service';

@Module({
  controllers: [BusTicketsController],
  providers: [BusTicketsService]
})
export class BusTicketsModule {}
