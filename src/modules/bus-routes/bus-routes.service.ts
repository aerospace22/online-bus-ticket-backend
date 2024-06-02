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
    });
  }

  async getById(id: number) {
    return await this.prismaService.busRoute.findUnique({
      where: {
        id,
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
    data.routeCode = `${data.busNo}${new Date().getUTCMilliseconds()}`;

    return await this.prismaService.busRoute.create({
      data,
    });
  }
}
