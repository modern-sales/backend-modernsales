// auth.controller.ts
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/request-otp')
  @HttpCode(200)
  async requestLoginOtp(@Body('email') email: string): Promise<{ success: boolean; message?: string }> {
    const success = await this.authService.sendLoginOtp(email);
    if (success) {
      return { success };
    } else {
      return { success, message: 'Email not sent' }; // Return a message when the email fails to send
    }
  }

  @Post('signup/request-otp')
  @HttpCode(200)
  async requestSignUpOtp(@Body('email') email: string, @Body('name') name: string): Promise<{ success: boolean; message?: string }> {
    const success = await this.authService.sendSignUpOtp(email, name);
    if (success) {
      return { success };
    } else {
      return { success, message: 'Email not sent' }; // Return a message when the email fails to send
    }
  }

  @Post('login/verify-otp')
  @HttpCode(200)
  async verifyLoginOtp(
    @Body('email') email: string,
    @Body('otp') otp: string,
  ): Promise<void> {
    await this.authService.verifyLoginOtp(email, otp);
  }

  @Post('signup/verify-otp')
  @HttpCode(200)
  async verifySignUpOtp(
    @Body('email') email: string,
    @Body('otp') otp: string,
  ): Promise<void> {
    await this.authService.verifySignUpOtp(email, otp);
  }
}
