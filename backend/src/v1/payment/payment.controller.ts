// payment.controller.ts
import {
    Controller,
    Post,
    Body,
    Param,
    InternalServerErrorException,
    HttpCode,
    Req,
    Headers,
    RawBodyRequest,
  } from '@nestjs/common';
  import { PaymentService } from './payment.service';
  
  @Controller('payments')
  export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}
  
    // POST /payments/initiate/:bookingId
    @Post('initiate/:bookingId')
    async initiatePayment(
      @Param('bookingId') bookingId: string,
      @Body() initiatePaymentDto: { price: number; currency?: string },
    ) {
      try {
        const sessionUrl = await this.paymentService.createCheckoutSession(
          bookingId,
          initiatePaymentDto.price,
          initiatePaymentDto.currency || 'usd',
        );
        return { success: true, sessionUrl };
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }

      // Endpoint to handle Stripe webhook events
      @Post('webhook')
      async handleStripeWebhook(
        @Req() req: RawBodyRequest<Request>,
        @Headers('stripe-signature') sig: string
      ) {
        const rawBody = req.body ? req.body.toString() : '';
        return this.paymentService.handleWebhook(rawBody, sig);
      }
  }
  