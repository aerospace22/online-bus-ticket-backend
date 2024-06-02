import { Injectable } from '@nestjs/common';
import { PrismaService, PaymentsService } from '@/services';
import { BusRoutesService } from '@/modules/bus-routes/bus-routes.service';

@Injectable()
export class BusTicketsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paymentsService: PaymentsService,
    private readonly busRoutesService: BusRoutesService,
  ) {}

  async create(data: any) {
    const ticketNo = `TCKT${new Date().getTime()}`;
    const busRoute = await this.busRoutesService.getById(data.busRouteId);
    const paymentLink = await this.paymentsService.createPaymentLink({
      amount: busRoute.ticketPrice,
      description: `[TICKET-PAYMENT] - ${ticketNo}`,
    });

    const ticket = await this.prismaService.busRouteTicket.create({
      data,
    });

    return {
      paymentLink,
      ticket,
    };
  }
}
