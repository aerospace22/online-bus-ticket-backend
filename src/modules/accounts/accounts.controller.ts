import { Controller, Res, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { UserDTO } from './accounts.dto';

@ApiTags('Accounts API')
@Controller({
  path: 'accounts',
  version: '1',
})
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @ApiResponse({
    status: 200,
    description: 'List of Account',
  })
  @Get('/')
  async getAccountsHandler(@Res() response: Response) {
    const data = await this.accountsService.getAll();

    return response.status(HttpStatus.OK).json(data);
  }

  @ApiResponse({
    status: 200,
    description: 'Successfully created Account',
  })
  @Post('/')
  async createAccountHandler(@Body() userDTO: UserDTO, @Res() response: Response) {
    const data = await this.accountsService.create(userDTO);

    return response.status(HttpStatus.OK).json(data);
  }
}
