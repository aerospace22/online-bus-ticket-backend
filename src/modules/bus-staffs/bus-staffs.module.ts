import { Module } from '@nestjs/common';
import { PrismaService } from '@/services';
import { BusStaffsController } from './bus-staffs.controller';
import { BusStaffsService } from './bus-staffs.service';

@Module({
  controllers: [BusStaffsController],
  providers: [BusStaffsService, PrismaService],
})
export class BusStaffsModule {}
