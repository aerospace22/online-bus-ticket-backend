import { Module } from '@nestjs/common';
import { PrismaService, PaymentsService } from '@/services';
import { BusRoutesService } from '@/modules/bus-routes/bus-routes.service';
import { BusTicketsController } from './bus-tickets.controller';
import { BusTicketsService } from './bus-tickets.service';

@Module({
  controllers: [BusTicketsController],
  providers: [BusTicketsService, BusRoutesService, PrismaService, PaymentsService],
})
export class BusTicketsModule {}
