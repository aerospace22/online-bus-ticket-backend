import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppController } from './app.controller';
import { PaymentsService } from '@/services';
import { AppService } from '@/app/app.service';
import { AuthModule } from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/users/users.module';
import { BusRoutesModule } from '@/modules/bus-routes/bus-routes.module';
import { BusTicketsModule } from '@/modules/bus-tickets/bus-tickets.module';

const configService: ConfigService = new ConfigService();

const configModuleOpts = {
  envFilePath: '.env',
  isGlobal: true,
};

const mailerModuleOpts = {
  transport: {
    host: configService.get<string>('APP_MAIL_HOST'),
    port: configService.get<number>('APP_MAIL_PORT'),
    auth: {
      user: configService.get<string>('APP_MAIL_USER'),
      pass: configService.get<string>('APP_MAIL_PASSWORD'),
    },
  },
};

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOpts),
    MailerModule.forRoot(mailerModuleOpts),
    AuthModule,
    UsersModule,
    BusRoutesModule,
    BusTicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PaymentsService],
})
export class AppModule {}
