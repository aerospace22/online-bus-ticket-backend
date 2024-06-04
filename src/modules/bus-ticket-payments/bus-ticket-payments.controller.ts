import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BusTicketPaymentsService } from './bus-ticket-payments.service';

@ApiTags('Bus Ticket Payments API')
@Controller({
  path: 'bus-ticket-payments',
  version: '1',
})
export class BusTicketPaymentsController {
  constructor(private readonly busTicketPaymentsService: BusTicketPaymentsService) {}

  @ApiResponse({
    status: 200,
    description: 'List of BusTicketPayments',
  })
  @Get('/')
  async getBusTicketPaymentsHandler(@Res() response: Response) {
    const data = await this.busTicketPaymentsService.getAll();

    return response.status(HttpStatus.OK).json(data);
  }

  @ApiResponse({
    status: 200,
    description: 'List of BusTicketPayments',
  })
  @Get('/:id')
  async getBusTicketPaymentHandler(@Param('id') id: number, @Res() response: Response) {
    const data = await this.busTicketPaymentsService.getById(+id);

    return response.status(HttpStatus.OK).json(data);
  }
}
