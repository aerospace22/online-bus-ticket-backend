import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  private paymentObj: any;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.paymentObj = require('paymongo-node')('sk_test_dQSVMGNQGCnTyUXq77sCWAbR');
  }

  async createPaymentLink() {
    await this.paymentObj.links
      .create({
        amount: 10000,
        description: 'sample description',
        // insert other required attributes here
      })
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  }

  async getPaymentLinkByReference(referenceId: string) {
    //
  }
}
