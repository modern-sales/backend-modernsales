// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
const sgMail = require('@sendgrid/mail'); // Change this line

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
    this.transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY as string,
      },
    });
  }

  async sendOtpEmail(to: string, otp: string): Promise<void> {
    const mailOptions = {
      from: process.env.SENDGRID_FROM_EMAIL, // sender address
      to, // list of receivers
      subject: 'Your OTP for account verification', // Subject line
      text: `Your one-time password for account verification is: ${otp}`, // plain text body
      html: `<p>Your one-time password for account verification is: <b>${otp}</b></p>`, // html body
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending OTP email:', error);
    }
  }
}
