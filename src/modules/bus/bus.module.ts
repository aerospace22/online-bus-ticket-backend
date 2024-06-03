import { Module } from '@nestjs/common';
import { PrismaService } from '@/services';
import { BusService } from './bus.service';
import { BusController } from './bus.controller';

@Module({
  providers: [BusService, PrismaService],
  controllers: [BusController],
})
export class BusModule {}
