// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        // Configure your email transporter (example with Gmail)
        this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        });
    }

    async sendPaymentConfirmation(
        to: string,
        bookingId: string,
        amount: number,
    ): Promise<void> {
        const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Payment Confirmation',
        text: `Your payment for booking ${bookingId} of amount ${amount} was successful.`,
        };

        await this.transporter.sendMail(mailOptions);
    }
}
