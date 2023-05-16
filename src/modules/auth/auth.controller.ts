import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailService } from '@services/sendgrid_email/email.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
    ) {}

  @Post('signup')
  async signUp(@Body() user: { email: string; password: string; name: string }) {
    return await this.authService.signUp(user);
  }

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    return await this.authService.login(credentials);
  } 

  @Post('send-otp')
  async sendOtp(@Body('email') email: string): Promise<any> {
    // Generate your OTP here
    const otp = '123456';

    // Send the OTP email
    await this.emailService.sendOtpEmail(email, otp);

    return { message: 'OTP email sent' };
  }
}
