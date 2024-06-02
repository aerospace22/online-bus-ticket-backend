import { Controller, Res, Post, Body, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BusTicketsService } from './bus-tickets.service';
import { BusTicketDTO } from './bus-tickets.dto';

@ApiTags('Bus Routes API')
@Controller({
  path: 'bus-tickets',
  version: '1',
})
export class BusTicketsController {
  constructor(private readonly busTicketsService: BusTicketsService) {}

  @ApiResponse({
    status: 201,
    description: 'Successfully booked BusTicket',
  })
  @Post('/')
  async createBusRouteHandler(@Body() busRouteDTO: BusTicketDTO, @Res() response: Response) {
    const data = await this.busTicketsService.create(busRouteDTO);

    return response.status(HttpStatus.CREATED).json(data);
  }
}
