import { Module } from '@nestjs/common';
import { PrismaService, PaymentsService } from '@/services';
import { BusTicketPaymentsController } from './bus-ticket-payments.controller';
import { BusTicketPaymentsService } from './bus-ticket-payments.service';

@Module({
  controllers: [BusTicketPaymentsController],
  providers: [BusTicketPaymentsService, PrismaService, PaymentsService],
})
export class BusTicketPaymentsModule {}
