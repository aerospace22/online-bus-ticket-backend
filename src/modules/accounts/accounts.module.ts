import { Module } from '@nestjs/common';
import { PrismaService } from '@/services';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';

@Module({
  providers: [AccountsService, PrismaService],
  controllers: [AccountsController],
})
export class AccountsModule {}
