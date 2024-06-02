import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  private paymongo: any;

  constructor(private readonly configService: ConfigService) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.paymongo = require('paymongo-node')(configService.get<string>('APP_PAYMONGO_PRIVATE'));
  }

  async createPaymentLink() {
    const link = await this.paymongo.links.create({
      amount: 10000,
      description: 'sample description',
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
