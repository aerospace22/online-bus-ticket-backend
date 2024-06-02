import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/services';
import { AccountData } from './users.dto';
import { hashPassword } from '@/utils/password.util';

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) {}

  async findByEmail(email: string) {
    const user = await this.db.user.findUnique({
      where: { email },
    });

    return user;
  }

  async create(data: AccountData) {
    data.password = await hashPassword(data.password);
    data.accountType = 'customer';

    const user = await this.db.user.create({
      data: {
        ...data,
        accountNo: '1',
      },
    });

    return user;
  }
}
