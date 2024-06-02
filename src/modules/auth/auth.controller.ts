import { Controller, Res, Body, Post, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { MailService } from '@/services';
import { AuthCredentialsDTO, AccountDataDTO } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth API')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly mailService: MailService,
    private readonly authService: AuthService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Authenticate credentials success',
  })
  @Post('/login')
  async loginHandler(@Body() payload: AuthCredentialsDTO, @Res() response: Response) {
    const result = await this.authService.authenticateAccount(payload);

    return response.status(HttpStatus.OK).json(result);
  }

  @ApiResponse({
    status: 200,
    description: 'Authenticate credentials success',
  })
  @Post('/signup')
  async signupHandler(@Body() payload: AccountDataDTO, @Res() response: Response) {
    const result = await this.authService.signupAccount({ ...payload, accountType: 'customer' });

    return response.status(HttpStatus.OK).json(result);
  }

  @ApiResponse({
    status: 200,
    description: 'Request OTP success',
  })
  @Post('/request-otp')
  async requestOtpHandler(@Res() response: Response) {
    this.mailService.sendMail({
      to: 'patrickpolicarpio08@gmail.com',
      subject: 'Test mail notification',
      message: 'Test mail notification',
    });

    return response.status(HttpStatus.OK).json('mail sent');
  }

  // TODO: Verify OTP api

  // TODO: Update password api
}
