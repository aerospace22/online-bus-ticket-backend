import { Controller, Res, Get, Post, Patch, Delete, Body, HttpStatus, Param } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BusStaffsService } from './bus-staffs.service';
import { BusStaffDTO } from './bus-staffs.dto';

@ApiTags('Bus API')
@Controller({
  path: 'bus',
  version: '1',
})
export class BusStaffsController {
  constructor(private readonly busStaffs: BusStaffsService) {}

  @ApiResponse({
    status: 200,
    description: 'List of BusRoutes',
  })
  @Get('/')
  async getBusRoutesHandler(@Res() response: Response) {
    const data = await this.busStaffs.getAll();

    return response.status(HttpStatus.OK).json(data);
  }

  @ApiResponse({
    status: 200,
    description: 'Get BusRoute by id',
  })
  @Get('/:id')
  async getBusRouteHandler(@Param() id: number, @Res() response: Response) {
    const data = await this.busStaffs.getById(id);

    return response.status(HttpStatus.OK).json(data);
  }

  @ApiResponse({
    status: 200,
    description: 'Update BusRoute by id',
  })
  @Patch('/:id')
  async updateBusRouteHandler(
    @Param('id') id: number,
    @Body() busStaffDTO: BusStaffDTO,
    @Res() response: Response,
  ) {
    const data = await this.busStaffs.updateById(id, busStaffDTO);

    return response.status(HttpStatus.OK).json(data);
  }

  @ApiResponse({
    status: 204,
    description: 'Delete BusRoute by id',
  })
  @Delete('/:id')
  async deleteBusRouteHandler(@Param('id') id: number, @Res() response: Response) {
    const data = await this.busStaffs.deleteById(id);

    return response.status(HttpStatus.NO_CONTENT).json(data);
  }

  @ApiResponse({
    status: 201,
    description: 'Successfully created BusRoute',
  })
  @Post('/')
  async createBusRouteHandler(@Body() busStaffDTO: BusStaffDTO, @Res() response: Response) {
    const data = await this.busStaffs.create(busStaffDTO);

    return response.status(HttpStatus.CREATED).json(data);
  }
}
