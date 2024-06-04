import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/services';
import { BusRouteDTO } from './bus-routes.dto';

@Injectable()
export class BusRoutesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.busRoute.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        bus: true,
      },
    });
  }

  async getById(id: number) {
    return await this.prismaService.busRoute.findUnique({
      where: {
        id,
      },
      include: {
        bus: {
          include: {
            busStaffs: true,
          },
        },
        busRouteTickets: true,
        busRouteTicketBookings: true,
      },
    });
  }

  async updateById(id: number, data: BusRouteDTO) {
    return await this.prismaService.busRoute.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteById(id: number) {
    return await this.prismaService.busRoute.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: any) {
    const bus = await this.prismaService.bus.findUnique({ where: { id: data.busId } });
    data.routeCode = `${bus.busNo}${new Date().getUTCMilliseconds()}`;

    return await this.prismaService.busRoute.create({
      data,
    });
  }

  async getTicketsByBusRouteId(id: number) {
    return await this.prismaService.busRouteTicket.findMany({
      where: {
        busRouteId: id,
      },
      orderBy: {
        type: 'desc',
      },
    });
  }

  async createTicketForBusRouteId(data: any) {
    return await this.prismaService.busRouteTicket.create({
      data,
    });
  }
}
