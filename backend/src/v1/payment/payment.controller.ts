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
        throw new InternalServerErrorException(
          'Failed to create payment session',
        );
      }
    }

      // Endpoint to handle Stripe webhook events
    @Post('webhook')
    @HttpCode(200)
    async handleStripeWebhook(
        @Req() request: Request,
        @Headers('stripe-signature') signature: string,
    ) {
        return this.paymentService.handleWebhook(request.body, signature);
    }
  }
  