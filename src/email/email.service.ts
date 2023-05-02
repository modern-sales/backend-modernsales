import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as AWS from 'aws-sdk';

@Injectable()
export class EmailService {
  private ses: AWS.SES;
  private transporter;

  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
      region: process.env.AWS_SES_REGION,
    });

    this.ses = new AWS.SES({ apiVersion: '2010-12-01' });

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
    const params: AWS.SES.SendEmailRequest = {
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
    };

    await this.ses.sendEmail(params).promise();
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
