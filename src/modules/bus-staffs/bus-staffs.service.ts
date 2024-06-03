import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/services';
import { BusStaffDTO } from './bus-staffs.dto';

@Injectable()
export class BusStaffsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.busStaff.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }

  async getById(id: number) {
    return await this.prismaService.busStaff.findUnique({
      where: {
        id,
      },
    });
  }

  async updateById(id: number, data: BusStaffDTO) {
    return await this.prismaService.busStaff.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteById(id: number) {
    return await this.prismaService.busStaff.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: any) {
    return await this.prismaService.busStaff.create({
      data,
    });
  }
}
