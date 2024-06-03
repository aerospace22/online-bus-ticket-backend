import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '@/modules/users/users.service';
import { AuthCredentials, AccountData } from './auth.dto';
import { verifyPassword } from '@/utils/password.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public static get JWT_SECRET_KEY() {
    return new ConfigService().get<string>('APP_JWT_SECRET');
  }

  protected generateOTP(length: number = 6) {
    let digits = '';
    const possibleDigits = '0123456789';

    for (let i = 0; i < length; i++) {
      digits += possibleDigits.charAt(Math.floor(Math.random() * possibleDigits.length));
    }

    return digits;
  }

  protected async verifyUserPassword(user: User, loginPassword: string) {
    return await verifyPassword(loginPassword, user.password);
  }

  async authenticateAccount(credentials: AuthCredentials) {
    const { email, password, loginType } = credentials;

    const user = await this.usersService.findByEmail(email);

    if (
      !user ||
      !user.accountType.includes(loginType) ||
      !(await this.verifyUserPassword(user, password))
    ) {
      return null;
    }

    delete user.password;

    return {
      user,
      accessToken: this.jwtService.sign(user),
    };
  }

  async signupAccount(data: AccountData) {
    const emailExists = await this.usersService.findByEmail(data.email);

    if (emailExists) {
      return new BadRequestException('EMAIL_ALREADY_USED');
    }

    const user = await this.usersService.create(data);
    const otp = await this.requestOTP(user.email);

    return { user, otp };
  }

  async requestOTP(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return new UnauthorizedException();
    }

    // TODO: Generate & save otp token of user
    // TODO: Send generated otp to user email

    return {
      status: 'SENT',
    };
  }

  async createAccount(data: any) {
    console.log(data);
  }
}
