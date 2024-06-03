import { Module } from '@nestjs/common';
import { BusStaffsController } from './bus-staffs.controller';
import { BusStaffsService } from './bus-staffs.service';

@Module({
  controllers: [BusStaffsController],
  providers: [BusStaffsService]
})
export class BusStaffsModule {}
