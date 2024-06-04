import { Controller, Res, Get, Post, Patch, Delete, Body, HttpStatus, Param } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BusStaffsService } from './bus-staffs.service';
import { BusStaffDTO } from './bus-staffs.dto';

@ApiTags('Bus Staffs API')
@Controller({
  path: 'bus-staffs',
  version: '1',
})
export class BusStaffsController {
  constructor(private readonly busStaffs: BusStaffsService) {}

  @ApiResponse({
    status: 200,
    description: 'List of BusStaffs',
  })
  @Get('/')
  async getBusStaffsHandler(@Res() response: Response) {
    const data = await this.busStaffs.getAll();

    return response.status(HttpStatus.OK).json(data);
  }

  @ApiResponse({
    status: 200,
    description: 'Get BusStaff by id',
  })
  @Get('/:id')
  async getBusStaffHandler(@Param('id') id: number, @Res() response: Response) {
    const data = await this.busStaffs.getById(+id);

    return response.status(HttpStatus.OK).json(data);
  }

  @ApiResponse({
    status: 200,
    description: 'Update BusStaff by id',
  })
  @Patch('/:id')
  async updateBusStaffHandler(
    @Param('id') id: number,
    @Body() busStaffDTO: BusStaffDTO,
    @Res() response: Response,
  ) {
    const data = await this.busStaffs.updateById(id, busStaffDTO);

    return response.status(HttpStatus.OK).json(data);
  }

  @ApiResponse({
    status: 204,
    description: 'Delete BusStaff by id',
  })
  @Delete('/:id')
  async deleteBusStaffHandler(@Param('id') id: number, @Res() response: Response) {
    const data = await this.busStaffs.deleteById(+id);

    return response.status(HttpStatus.NO_CONTENT).json(data);
  }

  @ApiResponse({
    status: 201,
    description: 'Successfully created BusStaff',
  })
  @Post('/')
  async createBusStaffHandler(@Body() busStaffDTO: BusStaffDTO, @Res() response: Response) {
    const data = await this.busStaffs.create(busStaffDTO);

    return response.status(HttpStatus.CREATED).json(data);
  }
}
