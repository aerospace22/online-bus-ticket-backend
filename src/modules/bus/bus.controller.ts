import { Controller, Res, Get, Post, Patch, Delete, Body, HttpStatus, Param } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BusService } from './bus.service';
import { BusDTO } from './bus.dto';

@ApiTags('Bus API')
@Controller({
  path: 'bus',
  version: '1',
})
export class BusController {
  constructor(private readonly busService: BusService) {}

  @ApiResponse({
    status: 200,
    description: 'List of Bus',
  })
  @Get('/')
  async getBussesHandler(@Res() response: Response) {
    const data = await this.busService.getAll();

    return response.status(HttpStatus.OK).json(data);
  }

  @ApiResponse({
    status: 200,
    description: 'Get Bus by id',
  })
  @Get('/:id')
  async getBusHandler(@Param('id') id: number, @Res() response: Response) {
    const data = await this.busService.getById(+id);

    return response.status(HttpStatus.OK).json(data);
  }

  @ApiResponse({
    status: 200,
    description: 'Update Bus by id',
  })
  @Patch('/:id')
  async updateBusHandler(
    @Param('id') id: number,
    @Body() busDTO: BusDTO,
    @Res() response: Response,
  ) {
    const data = await this.busService.updateById(id, busDTO);

    return response.status(HttpStatus.OK).json(data);
  }

  @ApiResponse({
    status: 204,
    description: 'Delete Bus by id',
  })
  @Delete('/:id')
  async deleteBusHandler(@Param('id') id: number, @Res() response: Response) {
    const data = await this.busService.deleteById(+id);

    return response.status(HttpStatus.NO_CONTENT).json(data);
  }

  @ApiResponse({
    status: 201,
    description: 'Successfully created Buss',
  })
  @Post('/')
  async createBusHandler(@Body() busDTO: BusDTO, @Res() response: Response) {
    const data = await this.busService.create(busDTO);

    return response.status(HttpStatus.CREATED).json(data);
  }
}
