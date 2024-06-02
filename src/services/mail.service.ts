import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

type MailPayload = {
  to: string;
  subject: string;
  message: string;
};

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public sendMail(payload: MailPayload) {
    console.log(payload);

    try {
      this.mailerService
        .sendMail({
          from: 'system.no-reply@domain.com',
          to: payload.to,
          subject: payload.subject,
          text: payload.message,
        })
        .then((result) => {
          console.log(result);
        });
    } catch (error) {
      console.log('mail-send-error', error);
    }
  }
}
