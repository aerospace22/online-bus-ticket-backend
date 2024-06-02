import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PaymentsService } from '@/services';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly paymentsService: PaymentsService,
  ) {}

  @Get()
  async getHello() {
    return await this.paymentsService.createPaymentLink();
  }
}
