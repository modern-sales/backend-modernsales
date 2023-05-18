// auth.service.ts
import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { EmailService } from '@services/sendgrid_email/email.service';
import { DynamoDBService } from '@services/aws_dynamodb/dynamodb.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  private otpMap: Map<string, { otp: string; expiresAt: Date }> = new Map();

  constructor(
    private readonly emailService: EmailService,
    private readonly dynamoDBService: DynamoDBService,
  ) { }

  async signUpUser(email: string, name: string): Promise<boolean> {
    // Implement custom signup logic here, if needed.
    // For now, it simply sends an OTP.
    return this.sendOtp(email);
  }

  async sendOtp(email: string): Promise<boolean> {
    // Validate email
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      console.error('Invalid email address');
      throw new BadRequestException('Invalid email address');
    }

    const otp = this.generateNumericOtp(4);
    const expiresAt = new Date(Date.now() + 3 * 7 * 24 * 60 * 60 * 1000); // 3 weeks

    this.otpMap.set(email, { otp, expiresAt });
    const emailSent = await this.emailService.sendOtpEmail(email, otp);

    if (!emailSent) {
      console.error('Error sending OTP email');
      throw new InternalServerErrorException('Failed to send OTP email');
    }

    return emailSent;
  }

  async verifyOtp(email: string, otp: string): Promise<void> {
    const storedOtpData = this.otpMap.get(email);

    if (!storedOtpData) {
      throw new Error('OTP not found');
    }

    if (storedOtpData.expiresAt < new Date()) {
      this.otpMap.delete(email);
      throw new Error('OTP has expired');
    }

    if (storedOtpData.otp !== otp) {
      throw new Error('Invalid OTP');
    }

    // OTP is valid, create a session and store it in DynamoDB
    const sessionId = uuidv4();
    const sessionExpiresAt = new Date(Date.now() + 3 * 7 * 24 * 60 * 60 * 1000); // 3 weeks

    await this.storeSessionData(sessionId, email, sessionExpiresAt);
  }

  async storeSessionData(
    sessionId: string,
    email: string,
    expiresAt: Date,
  ): Promise<void> {
    const dynamoDB = this.dynamoDBService.getRawClient();
    const params = {
      TableName: 'your-session-table',
      Item: {
        sessionId: { S: sessionId },
        email: { S: email },
        expiresAt: { S: expiresAt.toISOString() },
      },
    };

    try {
      await dynamoDB.putItem(params);
    } catch (error) {
      console.error('Error storing session data:', error);
      throw new Error('Failed to store session data');
    }
  }

  private generateNumericOtp(length: number): string {
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10).toString();
    }
    return otp;
  }
}