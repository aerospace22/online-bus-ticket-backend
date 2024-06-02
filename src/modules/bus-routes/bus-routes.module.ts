import { Module } from '@nestjs/common';
import { PrismaService } from '@/services';
import { BusRoutesController } from './bus-routes.controller';
import { BusRoutesService } from './bus-routes.service';

@Module({
  controllers: [BusRoutesController],
  providers: [BusRoutesService, PrismaService],
})
export class BusRoutesModule {}
