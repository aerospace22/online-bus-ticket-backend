import { Controller, Res, Body, Post, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { MailService } from '@/services';
import { AuthCredentialsDTO, AccountDataDTO, AccountOtpDTO, AccountVerifyOtpDTO } from './auth.dto';
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

    if (!result) {
      return response.status(HttpStatus.UNAUTHORIZED).json('UNAUTHORIZED');
    }

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
  async requestOtpHandler(@Body() accountOtpDTO: AccountOtpDTO, @Res() response: Response) {
    const result = await this.authService.createOtp(accountOtpDTO.email);

    if (result.message === 'EMAIL_NOT_FOUND') {
      return response.status(HttpStatus.BAD_REQUEST).json(result);
    }

    return response.status(HttpStatus.OK).json(result);
  }

  @ApiResponse({
    status: 200,
    description: 'Request OTP success',
  })
  @Post('/verify-otp')
  async verifyOtpHandler(
    @Body() accountVerifyOtpDTO: AccountVerifyOtpDTO,
    @Res() response: Response,
  ) {
    const result = await this.authService.verifyOtp(accountVerifyOtpDTO.code);

    if (result.message === 'OTP_INVALID') {
      return response.status(HttpStatus.BAD_REQUEST).json(result);
    }

    return response.status(HttpStatus.OK).json(result);
  }
}
