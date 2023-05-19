// auth.service.ts
import { Injectable, InternalServerErrorException, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { EmailService } from '@services/sendgrid_email/email.service';
import { DynamoDBService } from '@services/aws_dynamodb/dynamodb.service';
import { UsersService } from '@modules/users/users.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly emailService: EmailService,
    private readonly dynamoDBService: DynamoDBService,
    private readonly usersService: UsersService,
  ) {}

  async sendLoginOtp(email: string): Promise<boolean> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return this.sendOtp(email);
  }

  async sendSignUpOtp(email: string): Promise<boolean> {
    const user = await this.usersService.findUserByEmail(email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    return this.sendOtp(email);
  }

  async verifyLoginOtp(email: string, otp: string): Promise<any | Error> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      return new BadRequestException('User not found');
    }

    const verifyOtpResult = await this.verifyOtp(email, otp);
    if (verifyOtpResult instanceof Error) {
        return verifyOtpResult;
    }

    const sessionId = uuidv4();
    const sessionExpiresAt = new Date(Date.now() + 3 * 7 * 24 * 60 * 60 * 1000); 
    await this.storeSessionData(sessionId, email, sessionExpiresAt);
    return {sessionId : sessionId, user: user};
}

async verifySignUpOtp(email: string, otp: string, name: string): Promise<any | Error> {
    const verifyOtpResult = await this.verifyOtp(email, otp);
    if (verifyOtpResult instanceof Error) {
        return verifyOtpResult;
    }

    const user = await this.usersService.createUser(email, name);
    const sessionId = uuidv4();
    const sessionExpiresAt = new Date(Date.now() + 3 * 7 * 24 * 60 * 60 * 1000); 
    await this.storeSessionData(sessionId, email, sessionExpiresAt);
    return {sessionId : sessionId, user: user};
}

  async sendOtp(email: string): Promise<boolean> {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Invalid email address');
    }

    const otp = this.generateNumericOtp(4);
    const expiresAt = new Date(Date.now() + 3 * 7 * 24 * 60 * 60 * 1000); 

    // Store OTP to DynamoDB
    await this.storeOtpData(email, otp, expiresAt);

    const emailSent = await this.emailService.sendOtpEmail(email, otp);
    if (!emailSent) {
      throw new InternalServerErrorException('Failed to send OTP email');
    }

    return emailSent;
  }

  async verifyOtp(email: string, otp: string): Promise<void | Error> {
    console.log('email' + email)
    console.log('=================== verifyOtp ===================')
    const storedOtpData = await this.getOtpData(email);
    if (storedOtpData instanceof Error) {
      return new InternalServerErrorException(storedOtpData.message);
    }

    if (!storedOtpData) {
      return new NotFoundException('OTP not found');
    }
  
    if (storedOtpData.expiresAt < new Date()) {
      await this.deleteOtpData(email);
      return new BadRequestException('OTP has expired');
    }
  
    if (storedOtpData.otp !== otp) {
      return new UnauthorizedException('Invalid OTP');
    }
}


  async storeSessionData(sessionId: string, email: string, expiresAt: Date): Promise<void> {
    const dynamoDB = this.dynamoDBService.getRawClient();
    const params = {
      TableName: process.env.DYNAMODB_SESSIONS_TABLE,
      Item: {
        _id: { S: sessionId },
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

  private async storeOtpData(email: string, otp: string, expiresAt: Date): Promise<void> {
    const dynamoDB = this.dynamoDBService.getRawClient();
    const params = {
      TableName: process.env.DYNAMODB_OTPS_TABLE,
      Item: {
        email: { S: email },
        otp: { S: otp },
        expiresAt: { S: expiresAt.toISOString() },
      },
    };

    try {
      await dynamoDB.putItem(params);
    } catch (error) {
      console.error('Error storing OTP data:', error);
      throw new Error('Failed to store OTP data');
    }
  }

  private async getOtpData(email: string): Promise<{ otp: string; expiresAt: Date } | null | Error> {
    console.log('=================== getOtpData ===================')
    console.log('email', email)
    const dynamoDB = this.dynamoDBService.getRawClient();
    const params = {
      TableName: process.env.DYNAMODB_OTPS_TABLE,
      Key: {
        email: { S: email },
      },
    };

    try {
      console.log(params)
      const result = await dynamoDB.getItem(params);
      console.log('result', result)
      if (!result.Item || !result.Item.otp || !result.Item.expiresAt) {
        return null;
      }
      return {
        otp: result.Item.otp.S || '',
        expiresAt: result.Item.expiresAt.S ? new Date(result.Item.expiresAt.S) : new Date(),
      };
    } catch (error) {
      console.error('Error getting OTP data:', error);
      return new Error('Failed to get OTP data');
    }
  }

  private async deleteOtpData(email: string): Promise<void> {
    const dynamoDB = this.dynamoDBService.getRawClient();
    const params = {
      TableName: process.env.DYNAMODB_OTP_TABLE,
      Key: {
        email: { S: email },
      },
    };

    try {
      await dynamoDB.deleteItem(params);
    } catch (error) {
      console.error('Error deleting OTP data:', error);
      throw new Error('Failed to delete OTP data');
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
