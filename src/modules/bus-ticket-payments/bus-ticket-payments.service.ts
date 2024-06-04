import { Injectable } from '@nestjs/common';
import { PrismaService, PaymentsService } from '@/services';

@Injectable()
export class BusTicketPaymentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paymentsService: PaymentsService,
  ) {}

  async getAll() {
    return await this.prismaService.busRouteBookingTransaction.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }

  async getById(id: number) {
    return await this.prismaService.busRouteBookingTransaction.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        busRouteBookingTickets: true,
      },
    });
  }

  async getAllByCustomer(customerId: number) {
    return await this.prismaService.busRouteBookingTransaction.findMany({
      where: {
        userId: customerId,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  payTicket() {
    //
  }
}
