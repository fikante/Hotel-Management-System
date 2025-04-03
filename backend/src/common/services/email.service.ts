// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto'; 

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
    public generateRandomPassword(length: number = 12): string {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        return Array.from(crypto.getRandomValues(new Uint32Array(length)))
            .map((x) => charset[x % charset.length])
            .join('');
    }
    async sendStaffWelcomeEmail(
        to: string,
        staffName: string,
        temporaryPassword: string
    ): Promise<void> {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject: 'Welcome to Hotel Management System',
            html: `
                <h1>Account Credentials</h1>
                <p>Hello ${staffName},</p>
                <p>Your temporary password: <strong>${temporaryPassword}</strong></p>
                <p>Please change it after first login.</p>
            `,
        };

        await this.transporter.sendMail(mailOptions);
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
