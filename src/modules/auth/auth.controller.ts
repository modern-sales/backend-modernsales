import { Controller, Post, Param, Res, Body, HttpStatus } from '@nestjs/common';
import { EmailService } from '@services/aws_ses/email.service';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly emailService: EmailService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('otp/:email')
  async sendOneTimeCode(@Param('email') email: string, @Res() res: Response): Promise<void> {
    try {
      await this.emailService.generateAndSendOneTimeCode(email);
      res.status(200).json({ message: 'OTP sent successfully.' });
    } catch (error) {
      console.error('Error sending OTP:', error);
      res.status(500).json({ message: 'Failed to send OTP.' });
    }
  }

  @Post('login')
  async login(
    @Body('primary_email') email: string,
    @Body('otp') otp: string,
    @Res() res: Response,
  ): Promise<void> {
    console.log(email);
    const user = await this.usersService.findUserByEmail(email);
    console.log(user);

    if (!user) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid email or OTP.' });
      return;
    }

    // Assuming you have a method to validate the OTP
    const isOtpValid = await this.emailService.isValidOtp(email, otp);

    if (!isOtpValid) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid email or OTP.' });
      return;
    }

    const payload = { email: user.primary_email, sub: user._id };
    const token = this.jwtService.sign(payload);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false, // Set to true for HTTPS only
      // domain: 'your_domain.com', // Set this if needed
      // expires: new Date(Date.now() + expiration), // Set this if needed
    });

    res.status(HttpStatus.OK).json({ message: 'Logged in successfully.' });
  }
}
