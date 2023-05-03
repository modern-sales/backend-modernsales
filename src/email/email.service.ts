import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SES, SendEmailCommand } from '@aws-sdk/client-ses';

@Injectable()
export class EmailService {
  private ses: SES;
  private transporter;

  constructor() {
    this.ses = new SES({
      credentials: {
        accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY as string,
      },
      region: process.env.AWS_SES_REGION,
    });

    this.transporter = nodemailer.createTransport({
      host: 'your_smtp_host',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'your_email',
        pass: 'your_email_password',
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const params = new SendEmailCommand({
      Source: 'your_email',
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

  public generateAndSendOneTimeCode(email: string): Promise<void> {
    const code = this.generateOneTimeCode();
    const subject = 'Your One-Time Code';
    const text = `Your one-time code is: ${code}`;
    return this.sendEmail(email, subject, text);
  }

  private generateOneTimeCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
