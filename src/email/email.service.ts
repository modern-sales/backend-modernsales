import { Injectable } from '@nestjs/common';
import { SES, SendEmailCommand } from '@aws-sdk/client-ses';
import { OtpStorage } from './types/otp-storage.interface';

@Injectable()
export class EmailService {
  private ses: SES;
  private otpStorage: OtpStorage[] = [];

  constructor() {
    this.ses = new SES({
      credentials: {
        accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY as string,
      },
      region: process.env.AWS_SES_REGION,
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const params = new SendEmailCommand({
      Source: process.env.AWS_SES_SENDER_EMAIL as string,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Text: {
            Data: text,
          },
        },
      },
    });
  
    await this.ses.send(params);
  }

  public async generateAndSendOneTimeCode(email: string): Promise<string> {
    const code = this.generateOneTimeCode();
    const subject = 'Your One-Time Code';
    const text = `Your one-time code is: ${code}`;
    await this.sendEmail(email, subject, text);
  
    const otpExpirationTimeInMinutes = 5;
    const expiresAt = Date.now() + otpExpirationTimeInMinutes * 60 * 1000;
    
    // Remove any existing OTP for the email before adding a new one
    this.otpStorage = this.otpStorage.filter((otp) => otp.email !== email);
    this.otpStorage.push({ email, otp: code, expiresAt });
  
    return code;
  }

  public isValidOtp(email: string, otp: string): boolean {
    const storedOtp = this.otpStorage.find((o) => o.email === email);

    if (!storedOtp || storedOtp.expiresAt < Date.now()) {
      return false;
    }

    return storedOtp.otp === otp;
  }

  private generateOneTimeCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  
}
