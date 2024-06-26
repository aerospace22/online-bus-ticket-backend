import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export type AuthCredentials = {
  email: string;
  password: string;
  loginType: 'admin' | 'customer';
};

export type AccountData = Pick<
  User,
  'email' | 'firstName' | 'lastName' | 'password' | 'accountType'
>;

export class AuthCredentialsDTO implements AuthCredentials {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  loginType: 'admin' | 'customer';
}

export class AccountDataDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastName: string;
}

export class AccountOtpDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;
}

export class AccountVerifyOtpDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  code: string;
}
