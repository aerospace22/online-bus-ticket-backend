import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export type AuthCredentials = {
  email: string;
  password: string;
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
}

export class AccountDataDTO extends AuthCredentialsDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastName: string;
}
