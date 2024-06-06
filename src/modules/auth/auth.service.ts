import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService, MailService } from '@/services';
import { UsersService } from '@/modules/users/users.service';
import { AuthCredentials, AccountData } from './auth.dto';
import { verifyPassword } from '@/utils/password.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
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

  protected async verifyUserCredentials(user: User, credentials: AuthCredentials) {
    if (
      !(await verifyPassword(credentials.password, user.password)) ||
      !user.accountType.includes(credentials.loginType)
    ) {
      return false;
    }

    return true;
  }

  async authenticateAccount(credentials: AuthCredentials) {
    const { email } = credentials;

    const user = await this.usersService.findByEmail(email);

    if (!user || !(await this.verifyUserCredentials(user, credentials))) {
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
    const otp = await this.createOtp(user.email);

    return { user, otp };
  }

  async createOtp(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return {
        message: 'EMAIL_NOT_FOUND',
      };
    }

    const generatedCode = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date().getTime() + 2 * 60 * 60 * 1000;
    const userOtp = await this.prismaService.userOtp.create({
      data: {
        userId: user.id,
        code: generatedCode.toString(),
        expiresAt: new Date(expiresAt).toISOString(),
      },
    });

    this.mailService.sendMail({
      to: 'patrickpolicarpio08@gmail.com',
      subject: 'Verify Your Account',
      message: `Your account verification ONE-TIME-PASSCODE: ${userOtp.code}`,
    });

    return {
      message: 'REQUESTED_OTP_CREATED',
      expiresAt: userOtp.expiresAt,
    };
  }

  async verifyOtp(data: { code: string }) {
    const otp = await this.prismaService.userOtp.findFirst({
      where: {
        code: data.code,
      },
    });

    if (otp) {
      await this.prismaService.userOtp.update({
        where: {
          id: otp.id,
        },
        data: {
          isUsed: true,
        },
      });

      return {
        message: 'OTP_VALID',
      };
    }

    return {
      message: 'OTP_INVALID',
    };
  }
}
