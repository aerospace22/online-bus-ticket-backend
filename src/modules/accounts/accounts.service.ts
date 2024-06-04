import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@/services';
import { hashPassword } from '@/utils/password.util';

@Injectable()
export class AccountsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.user.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }

  async create(data: Partial<User>) {
    data.password = await hashPassword(data.password);

    return await this.prismaService.user.create({
      // @ts-ignore
      data,
    });
  }
}
