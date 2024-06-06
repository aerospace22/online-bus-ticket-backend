import { Module } from '@nestjs/common';
import { PrismaService } from '@/services';
import { UsersService } from '@/modules/users/users.service';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';

@Module({
  providers: [AccountsService, PrismaService, UsersService],
  controllers: [AccountsController],
})
export class AccountsModule {}
