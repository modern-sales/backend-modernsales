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
      host: process.env.SENDGRID_SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SENDGRID_USERNAME as string,
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
      html: `
      <!DOCTYPE html>
      <html>
        <div style="width: 100%;">
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0;">
            <h3>Your one-time password for account verification is:</h3>
            <div style="background-color: #f7f7f7; border: 1px solid #cccccc; border-radius: 5px; display: inline-block; padding: 15px; margin-bottom: 20px;">
              <h1 style="margin: 0; font-size: 32px;">${otp}</h1>
            </div>
            <p>Enter the code above on the verification page to complete the process!</p>
          </div>
        </div>
      </html>
      `,



    };

    try {
      console.log('Sending OTP email...');
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending OTP email:', error);
    }
  }
}
