import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

type MailPayload = {
  to: string;
  subject: string;
  message: string;
};

@Injectable()
export class MailService {
  private readonly mailerSend: MailerSend;

  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {
    this.mailerSend = new MailerSend({
      apiKey: this.configService.get<string>('APP_MAILERSEND_KEY'),
    });
  }

  public sendMailer() {
    try {
      const sentFrom = new Sender('you@yourdomain.com', 'CUL Transport System');
      const recipients = [new Recipient('patrickpolicarpio08@gmail.com', 'Patrick Policarpio')];

      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject('Test email sent from nestjs & mailersend')
        .setHtml('<strong>This is the HTML content</strong>')
        .setText('This is the text content');

      this.mailerSend.email
        .send(emailParams)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log('mailersend-send-error', error);
    }
  }

  public sendMail(payload: MailPayload) {
    try {
      const mail = this.mailerService.sendMail({
        from: 'system.no-reply@domain.com',
        to: payload.to,
        subject: payload.subject,
        text: payload.message,
      });

      console.log(mail);
    } catch (error) {
      console.log('mail-send-error', error);
    }
  }
}
