import { Module } from '@nestjs/common';
import { PrismaService, PaymentsService } from '@/services';
import { BusTicketsController } from './bus-tickets.controller';
import { BusTicketsService } from './bus-tickets.service';

@Module({
  controllers: [BusTicketsController],
  providers: [BusTicketsService, PrismaService, PaymentsService],
})
export class BusTicketsModule {}
