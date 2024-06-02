import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type CreatePaymentLinkPayload = {
  amount: number;
  description: string;
};

@Injectable()
export class PaymentsService {
  private paymongo: any;

  constructor(private readonly configService: ConfigService) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.paymongo = require('paymongo-node')(configService.get<string>('APP_PAYMONGO_PRIVATE'));
  }

  async createPaymentLink(payload: CreatePaymentLinkPayload) {
    const formattedAmount: string = `${payload.amount}00`;

    const link = await this.paymongo.links.create({
      amount: formattedAmount,
      description: payload.description,
    });

    return link;
  }

  async getPaymentLinkByReference(referenceId: string) {
    const link = await this.paymongo.links.getLinkByReferenceNumber({
      reference_number: referenceId,
    });

    return link;
  }
}
