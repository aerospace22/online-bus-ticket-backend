import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/services';
import { BusDTO } from './bus.dto';

@Injectable()
export class BusService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.bus.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }

  async getById(id: number) {
    return await this.prismaService.bus.findUnique({
      where: {
        id,
      },
    });
  }

  async updateById(id: number, data: BusDTO) {
    return await this.prismaService.bus.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteById(id: number) {
    return await this.prismaService.bus.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: any) {
    return await this.prismaService.bus.create({
      data,
    });
  }
}
