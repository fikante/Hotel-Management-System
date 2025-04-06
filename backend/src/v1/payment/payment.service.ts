// payment.service.ts
import { Inject, Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from 'src/common/entities/booking.entity';
import { Transaction } from 'src/common/entities/transaction.entity';
import { EmailService } from 'src/common/services/email.service';

@Injectable()
export class PaymentService {
  private stripe: Stripe;
  private readonly logger = new Logger(PaymentService.name);
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private emailService: EmailService,
  ) {
    // Initialize Stripe with your secret key
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
    }
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-03-31.basil',
    });
  }

  /**
   * Create a Stripe Checkout Session for a booking payment.
   */
  async createCheckoutSession(
    bookingId: string,
    price: number,
    currency: string,
  ): Promise<string|undefined> {
    console.log("hellow world.................................")
    // Retrieve the booking details for validation
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
      relations: ['guest'], // Adjust 'guest' to the correct relation name if different
    });
    if (!booking) {
      throw new Error('Booking not found');
    }

    console.log('Booking:', booking);

    // Create a Stripe Checkout session
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: `Payment for booking ${bookingId}`,
                metadata: {
                bookingId,
                },
            },
            unit_amount: price, // Price in smallest currency unit (e.g., cents)
          },
          quantity: 1,
        },
      ],
      // URLs to redirect the user after payment
      success_url: `https://${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://${process.env.FRONTEND_URL}/payment-cancel`,
      metadata: { bookingId },
    });

    return session.url ?? undefined;
  }

  async handleWebhook(rawBody: string, signature: string): Promise<string> {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not defined in environment variables');
    }
    let event: Stripe.Event;
    console.log('Received webhook event:', rawBody);
    console.log('I am here');
    console.log('...................................................................');
    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret,
      );
    } catch (err) {
      this.logger.error('Webhook signature verification failed.', err);
      throw new Error('Webhook signature verification failed.');
    }
    
    
    // Process the event based on its type
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      if (!session.metadata) {
        throw new Error('Session metadata is null');
      }
      console.log('bookingId:',session.metadata);
      const bookingId = session.metadata.bookingId;
      const booking = await this.bookingRepository.findOne({
        where: { id: bookingId },
        relations: ['guest'],
      });
      if (!booking) {
        throw new Error('Booking not found');
      }
      console.log('currency:', session.currency);
      console.log('amount_totla:', session.amount_total);
      // Update your transaction table
      const transaction = this.transactionRepository.create({
        booking,
        amount: session.amount_total ?? 0,
        currency: session.currency ?? 'usd',
        status: 'success',
        paymentIntentId: session.payment_intent as string,
      });
      await this.transactionRepository.save(transaction);
  
      // Update the booking status to "paid"
      await this.bookingRepository.update(bookingId, { bookingStatus: 'paid' });
  
      // Optionally, send a confirmation email to the user
      const mybooking = await this.bookingRepository.findOne({
        where: { id: bookingId },
        relations: ['guest'],
      });
      if (mybooking && mybooking.guest.email) {
        await this.emailService.sendPaymentConfirmation(
          mybooking.guest.email,
          bookingId,
          session.amount_total ?? 0,
        );
      }
    }
  
    // Handle other event types as necessary
    return 'Received webhook';
  }

  // More functions (like handleWebhook) will be defined below.
}
