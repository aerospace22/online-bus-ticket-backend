import { Controller, Res, Get, Post, Patch, Delete, Body, HttpStatus, Param } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BusRoutesService } from './bus-routes.service';
import { BusRouteDTO, BusRouteTicketDTO } from './bus-routes.dto';

@ApiTags('Bus Routes API')
@Controller({
  path: 'bus-routes',
  version: '1',
})
export class BusRoutesController {
  constructor(private readonly busRoutesService: BusRoutesService) {}

  @ApiResponse({
    status: 200,
    description: 'List of BusRoutes',
  })
  @Get('/')
  async getBusRoutesHandler(@Res() response: Response) {
    const data = await this.busRoutesService.getAll();

    return response.status(HttpStatus.OK).json(data);
  }

  @ApiResponse({
    status: 200,
    description: 'Get BusRoute by id',
  })
  @Get('/:id')
  async getBusRouteHandler(@Param('id') id: number, @Res() response: Response) {
    const data = await this.busRoutesService.getById(+id);

    return response.status(HttpStatus.OK).json(data);
  }

  @ApiResponse({
    status: 200,
    description: 'Update BusRoute by id',
  })
  @Patch('/:id')
  async updateBusRouteHandler(
    @Param('id') id: number,
    @Body() busRouteDTO: BusRouteDTO,
    @Res() response: Response,
  ) {
    const data = await this.busRoutesService.updateById(id, busRouteDTO);

    return response.status(HttpStatus.OK).json(data);
  }

  @ApiResponse({
    status: 204,
    description: 'Delete BusRoute by id',
  })
  @Delete('/:id')
  async deleteBusRouteHandler(@Param('id') id: number, @Res() response: Response) {
    const data = await this.busRoutesService.deleteById(+id);

    return response.status(HttpStatus.NO_CONTENT).json(data);
  }

  @ApiResponse({
    status: 201,
    description: 'Successfully created BusRoute',
  })
  @Post('/')
  async createBusRouteHandler(@Body() busRouteDTO: BusRouteDTO, @Res() response: Response) {
    const data = await this.busRoutesService.create(busRouteDTO);

    return response.status(HttpStatus.CREATED).json(data);
  }

  @ApiResponse({
    status: 200,
    description: 'Get Tickets BusRoute by id',
  })
  @Get('/tickets/:id')
  async getBusRouteTicketsByRouteHandler(@Param('id') id: number, @Res() response: Response) {
    const data = await this.busRoutesService.getTicketsByBusRouteId(+id);

    return response.status(HttpStatus.OK).json(data);
  }

  @ApiResponse({
    status: 201,
    description: 'Create Ticket BusRoute by id',
  })
  @Post('/tickets/:id')
  async createTicketForBusRouteIdHandler(
    @Param('id') id: number,
    @Body() busRouteTicketDTO: BusRouteTicketDTO,
    @Res() response: Response,
  ) {
    const data = await this.busRoutesService.createTicketForBusRouteId(busRouteTicketDTO);

    return response.status(HttpStatus.CREATED).json(data);
  }
}
